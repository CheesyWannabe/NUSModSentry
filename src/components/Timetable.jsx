import { Clock } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 8am to 10pm

const MODULE_COLORS = [
  { bg: 'bg-blue-500/15 dark:bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-700 dark:text-blue-300' },
  { bg: 'bg-violet-500/15 dark:bg-violet-500/20', border: 'border-violet-500', text: 'text-violet-700 dark:text-violet-300' },
  { bg: 'bg-emerald-500/15 dark:bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
  { bg: 'bg-rose-500/15 dark:bg-rose-500/20', border: 'border-rose-500', text: 'text-rose-700 dark:text-rose-300' },
  { bg: 'bg-amber-500/15 dark:bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-700 dark:text-amber-300' },
  { bg: 'bg-cyan-500/15 dark:bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-700 dark:text-cyan-300' },
  { bg: 'bg-fuchsia-500/15 dark:bg-fuchsia-500/20', border: 'border-fuchsia-500', text: 'text-fuchsia-700 dark:text-fuchsia-300' },
  { bg: 'bg-lime-500/15 dark:bg-lime-500/20', border: 'border-lime-500', text: 'text-lime-700 dark:text-lime-300' },
];

function timeToMin(t) {
  return parseInt(t.slice(0, 2)) * 60 + parseInt(t.slice(2));
}

export function Timetable({ modules }) {
  // Build a color map by module code
  const colorMap = {};
  modules.forEach((m, i) => {
    colorMap[m.code] = MODULE_COLORS[i % MODULE_COLORS.length];
  });

  // Build timetable slots
  const slots = [];
  modules.forEach(mod => {
    const sem1 = mod.data?.semesterData?.find(s => s.semester === 1) || mod.data?.semesterData?.[0];
    const timetable = sem1?.timetable || [];
    // Deduplicate by day+startTime+endTime+lessonType (show one representative slot per lesson group)
    const seen = new Set();
    timetable.forEach(slot => {
      const key = `${slot.day}-${slot.startTime}-${slot.endTime}-${slot.lessonType}`;
      if (seen.has(key)) return;
      seen.add(key);
      slots.push({ ...slot, moduleCode: mod.code, color: colorMap[mod.code] });
    });
  });

  const CELL_HEIGHT = 56; // px per hour
  const TIME_COL_W = 44; // px

  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Clock size={40} className="text-slate-300 dark:text-navy-600 mb-3" />
        <p className="text-slate-400 dark:text-slate-500 text-sm">Add modules to see your timetable</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide rounded-xl">
      <div style={{ minWidth: 640 }}>
        {/* Header row */}
        <div className="flex" style={{ paddingLeft: TIME_COL_W }}>
          {DAYS.map((day, i) => (
            <div key={day} className="flex-1 text-center py-2 border-b border-slate-200 dark:border-navy-700">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{DAY_SHORT[i]}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative flex">
          {/* Time column */}
          <div style={{ width: TIME_COL_W, minWidth: TIME_COL_W }}>
            {HOURS.map(h => (
              <div key={h} style={{ height: CELL_HEIGHT }} className="flex items-start justify-end pr-2 pt-1">
                <span className="text-[10px] font-mono text-slate-400 dark:text-navy-500">
                  {h === 12 ? '12pm' : h > 12 ? `${h - 12}pm` : `${h}am`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map(day => {
            const daySlots = slots.filter(s => s.day === day);

            return (
              <div key={day} className="flex-1 relative border-l border-slate-100 dark:border-navy-800/60">
                {/* Hour grid lines */}
                {HOURS.map(h => (
                  <div
                    key={h}
                    style={{ height: CELL_HEIGHT }}
                    className={`border-b border-slate-100 dark:border-navy-800/50 ${
                      h === 12 ? 'bg-amber-50/30 dark:bg-amber-950/10' : ''
                    }`}
                  />
                ))}

                {/* Peak time indicator */}
                <div
                  className="absolute left-0 right-0 bg-amber-400/8 dark:bg-amber-400/5 pointer-events-none"
                  style={{
                    top: (12 - 8) * CELL_HEIGHT,
                    height: 2 * CELL_HEIGHT,
                  }}
                />

                {/* Lesson slots */}
                {daySlots.map((slot, idx) => {
                  const startMin = timeToMin(slot.startTime);
                  const endMin = timeToMin(slot.endTime);
                  const topOffset = ((startMin / 60) - 8) * CELL_HEIGHT;
                  const height = ((endMin - startMin) / 60) * CELL_HEIGHT - 2;

                  const abbr = {
                    'Lecture': 'LEC',
                    'Tutorial': 'TUT',
                    'Laboratory': 'LAB',
                    'Seminar-Style Module Class': 'SEM',
                    'Recitation': 'REC',
                    'Packaged Lecture': 'LEC',
                    'Packaged Tutorial': 'TUT',
                    'Workshop': 'WKS',
                  }[slot.lessonType] || slot.lessonType?.slice(0, 3).toUpperCase();

                  return (
                    <div
                      key={`${slot.moduleCode}-${slot.day}-${slot.startTime}-${slot.lessonType}-${idx}`}
                      className={`
                        absolute left-0.5 right-0.5 rounded-md border-l-2 px-1.5 overflow-hidden
                        cursor-default select-none
                        ${slot.color.bg} ${slot.color.border} 
                        transition-all hover:brightness-110
                      `}
                      style={{ top: topOffset, height: Math.max(height, 20) }}
                      title={`${slot.moduleCode} ${slot.lessonType} [${slot.classNo}] @ ${slot.venue}`}
                    >
                      <p className={`text-[10px] font-bold leading-tight truncate ${slot.color.text}`}>
                        {slot.moduleCode}
                      </p>
                      {height > 28 && (
                        <p className={`text-[9px] leading-tight opacity-80 truncate ${slot.color.text}`}>
                          {abbr} [{slot.classNo}]
                        </p>
                      )}
                      {height > 40 && slot.venue && (
                        <p className={`text-[9px] leading-tight opacity-60 truncate ${slot.color.text}`}>
                          {slot.venue}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3 px-1">
          {modules.map((m, i) => (
            <div key={m.code} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm border-l-2 ${MODULE_COLORS[i % MODULE_COLORS.length].border} ${MODULE_COLORS[i % MODULE_COLORS.length].bg}`} />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{m.code}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-amber-400/20 border border-amber-400/40" />
            <span className="text-xs text-slate-400">Peak hours (12–2pm)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
