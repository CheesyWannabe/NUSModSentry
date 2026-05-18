import { useState, useCallback } from 'react';

const CURRENT_AY = '2024-2025';
const API_BASE = `https://api.nusmods.com/v2/${CURRENT_AY}`;

const PEAK_START = 12 * 60;
const PEAK_END = 14 * 60;

function timeToMin(t) {
  return parseInt(t.slice(0, 2)) * 60 + parseInt(t.slice(2));
}

function computeRisk(moduleData) {
  if (!moduleData) return { level: 'UNKNOWN', score: 0, reasons: [], suggestions: [] };

  const { semesterData } = moduleData;
  if (!semesterData || semesterData.length === 0) {
    return { level: 'LOW', score: 1, reasons: ['No active semester data found'], suggestions: [] };
  }

  const sem1 = semesterData.find(s => s.semester === 1) || semesterData[0];
  const timetable = sem1?.timetable || [];

  let score = 0;
  const reasons = [];
  const suggestions = [];

  const tutorials = timetable.filter(s =>
    ['Tutorial', 'Laboratory', 'Recitation', 'Sectional Teaching'].includes(s.lessonType)
  );
  const lectures = timetable.filter(s =>
    ['Lecture', 'Packaged Lecture'].includes(s.lessonType)
  );

  // Peak-hour congestion
  const peakSlots = timetable.filter(s => {
    const startMin = timeToMin(s.startTime);
    return startMin >= PEAK_START && startMin < PEAK_END;
  });
  if (peakSlots.length > 0) {
    score += 2;
    reasons.push(`${peakSlots.length} slot(s) fall in peak hours (12–2PM) — high competition`);
  }

  // Tutorial scarcity
  const tutClassNos = [...new Set(tutorials.map(t => t.classNo))];
  if (tutorials.length > 0) {
    if (tutClassNos.length <= 2) {
      score += 3;
      reasons.push(`Only ${tutClassNos.length} tutorial section(s) available — extremely limited`);
    } else if (tutClassNos.length <= 4) {
      score += 1;
      reasons.push(`Only ${tutClassNos.length} tutorial sections — limited availability`);
    }
  }

  // Alternate-week slots
  const altWeekSlots = timetable.filter(s =>
    s.weeks && Array.isArray(s.weeks) && s.weeks.length > 0 && s.weeks.length < 13
  );
  if (altWeekSlots.length > 0) {
    score += 1;
    reasons.push(`${altWeekSlots.length} alternate-week slot(s) detected — watch for hidden clashes`);
    suggestions.push('Verify alternate-week slots against other modules — they may clash on specific weeks');
  }

  if (tutorials.length === 0 && lectures.length > 0) {
    reasons.push('Lecture-only module — no tutorial bidding required');
  }

  const smallVenues = timetable.filter(s =>
    s.venue && (s.venue.includes('B1') || s.venue.includes('0201') || s.venue.includes('COM2'))
  );
  if (smallVenues.length > 0) {
    score += 1;
    reasons.push('Assigned to small venues — suggests capped enrollment');
  }

  if (score >= 3) {
    suggestions.push('Register immediately when CourseReg opens — do not wait');
    suggestions.push('Prepare a ranked list of tutorial slots sorted by early-morning and Friday afternoon (least popular)');
  }
  if (peakSlots.length > 0) {
    const nonPeak = timetable.filter(s => {
      const startMin = timeToMin(s.startTime);
      return startMin < PEAK_START || startMin >= PEAK_END;
    });
    if (nonPeak.length > 0) {
      suggestions.push(
        `Prefer off-peak slots: ${[...new Set(nonPeak.map(s => `${s.startTime.slice(0,2)}:${s.startTime.slice(2)}`))].slice(0, 3).join(', ')}`
      );
    }
  }
  if (suggestions.length === 0) {
    suggestions.push('No critical issues detected — standard registration strategy applies');
  }

  let level = 'LOW';
  if (score >= 4) level = 'HIGH';
  else if (score >= 2) level = 'MEDIUM';

  return { level, score, reasons, suggestions, timetable, sem1 };
}

function detectClashes(modules) {
  const clashes = [];
  const allSlots = modules.flatMap(m => {
    const sem1 = m.data?.semesterData?.find(s => s.semester === 1) || m.data?.semesterData?.[0];
    return (sem1?.timetable || []).map(slot => ({ moduleCode: m.code, ...slot }));
  });

  for (let i = 0; i < allSlots.length; i++) {
    for (let j = i + 1; j < allSlots.length; j++) {
      const a = allSlots[i];
      const b = allSlots[j];
      if (a.moduleCode === b.moduleCode) continue;
      if (a.day !== b.day) continue;

      const aStart = timeToMin(a.startTime);
      const aEnd = timeToMin(a.endTime);
      const bStart = timeToMin(b.startTime);
      const bEnd = timeToMin(b.endTime);

      if (aStart < bEnd && bStart < aEnd) {
        const aWeeks = a.weeks || Array.from({ length: 13 }, (_, k) => k + 1);
        const bWeeks = b.weeks || Array.from({ length: 13 }, (_, k) => k + 1);
        const aSet = new Set(aWeeks);
        const overlap = bWeeks.filter(w => aSet.has(w));

        if (overlap.length > 0) {
          const existing = clashes.find(c =>
            ((c.a.moduleCode === a.moduleCode && c.b.moduleCode === b.moduleCode) ||
             (c.a.moduleCode === b.moduleCode && c.b.moduleCode === a.moduleCode)) &&
            c.a.day === a.day && c.a.startTime === a.startTime
          );
          if (!existing) {
            clashes.push({ a, b, weeks: overlap, isHidden: overlap.length < 13 });
          }
        }
      }
    }
  }
  return clashes;
}

export function useModules(addToast) {
  const [modules, setModules] = useState(() => {
    try {
      const saved = localStorage.getItem('modsentry_modules');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [loading, setLoading] = useState({});

  const fetchModule = useCallback(async (code) => {
    const clean = code.trim().toUpperCase().replace(/\s/g, '');
    if (!clean) return;

    setModules(prev => {
      if (prev.some(m => m.code === clean)) {
        // Schedule toast asynchronously to avoid state-during-render
        setTimeout(() => addToast(`${clean} is already in your list`, 'warning'), 0);
        return prev;
      }
      return prev;
    });

    // Check synchronously via ref-like pattern using a captured snapshot
    let isDuplicate = false;
    setModules(prev => { isDuplicate = prev.some(m => m.code === clean); return prev; });
    if (isDuplicate) return;

    setLoading(prev => ({ ...prev, [clean]: true }));

    try {
      const res = await fetch(`${API_BASE}/modules/${clean}.json`);
      if (!res.ok) {
        if (res.status === 404) {
          addToast(`Module ${clean} not found — check the module code`, 'error');
        } else {
          addToast(`Failed to fetch ${clean}: server error (${res.status})`, 'error');
        }
        return;
      }
      const data = await res.json();
      const risk = computeRisk(data);
      const newMod = { code: clean, data, risk, addedAt: Date.now() };

      setModules(prev => {
        if (prev.some(m => m.code === clean)) return prev;
        const updated = [...prev, newMod];
        try { localStorage.setItem('modsentry_modules', JSON.stringify(updated)); } catch {}
        return updated;
      });

      addToast(`${clean} added — ${data.moduleCredit} MCs · Risk: ${risk.level}`, 'success');
    } catch (err) {
      if (err.name === 'TypeError') {
        addToast(`Network error fetching ${clean} — check your connection`, 'error');
      } else {
        addToast(`Error fetching ${clean}: ${err.message}`, 'error');
      }
    } finally {
      setLoading(prev => { const n = { ...prev }; delete n[clean]; return n; });
    }
  }, [addToast]);

  const removeModule = useCallback((code) => {
    setModules(prev => {
      const updated = prev.filter(m => m.code !== code);
      try { localStorage.setItem('modsentry_modules', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const parseNUSModsUrl = useCallback((url) => {
    try {
      const u = new URL(url);
      const codes = [];
      u.searchParams.forEach((_, key) => {
        if (/^[A-Z]{2,4}\d{4}[A-Z]?$/.test(key)) codes.push(key);
      });
      return codes;
    } catch {
      return [];
    }
  }, []);

  const clashes = detectClashes(modules);

  return { modules, loading, fetchModule, removeModule, parseNUSModsUrl, clashes };
}
