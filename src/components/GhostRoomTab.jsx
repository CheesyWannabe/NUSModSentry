import { useState, useMemo } from 'react';
import { Ghost, Search, LocateFixed, X, Building2, SlidersHorizontal } from 'lucide-react';
import { RoomCard } from './RoomCard';
import { VENUES, SCHEDULES, ZONES, DAYS, TIME_SLOTS, isOccupied, getEmptyDuration, formatTime } from '../data/venues';

function getCurrentDayAndTime() {
  const now = new Date();
  const jsDay = now.getDay(); // 0=Sun, 1=Mon...
  const dayMap = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
  const currentDay = dayMap[jsDay] || 'Monday';
  const h = now.getHours();
  const m = now.getMinutes() < 30 ? '00' : '30';
  const hh = String(h).padStart(2, '0');
  const timeSlot = `${hh}${m}`;
  // Clamp to valid range
  if (parseInt(timeSlot) < 800) return { day: currentDay, timeSlot: '0800' };
  if (parseInt(timeSlot) > 2200) return { day: currentDay, timeSlot: '2200' };
  return { day: currentDay, timeSlot };
}

export function GhostRoomTab() {
  const live = getCurrentDayAndTime();
  const [zone, setZone] = useState('ALL');
  const [day, setDay] = useState(live.day);
  const [timeSlot, setTimeSlot] = useState(live.timeSlot);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  function setLiveNow() {
    const { day: d, timeSlot: t } = getCurrentDayAndTime();
    setDay(d);
    setTimeSlot(t);
  }

  const venueTypes = ['ALL', 'Lecture Theatre', 'Seminar Room', 'Tutorial Room', 'Auditorium'];

  const availableRooms = useMemo(() => {
    const results = [];
    Object.entries(VENUES).forEach(([id, room]) => {
      // Zone filter
      if (zone !== 'ALL' && room.zone !== zone) return;
      // Type filter
      if (typeFilter !== 'ALL' && room.type !== typeFilter) return;
      // Search filter
      if (search && !room.name.toLowerCase().includes(search.toLowerCase()) &&
          !room.building.toLowerCase().includes(search.toLowerCase())) return;

      const schedule = SCHEDULES[id] || {};
      const occupied = isOccupied(schedule, day, timeSlot);
      if (occupied) return; // Skip occupied

      const emptyFor = getEmptyDuration(schedule, day, timeSlot);
      results.push({ ...room, id, emptyFor });
    });

    // Sort: free-all-day first, then by emptyFor duration desc
    results.sort((a, b) => {
      if (!a.emptyFor && b.emptyFor) return -1;
      if (a.emptyFor && !b.emptyFor) return 1;
      if (a.emptyFor && b.emptyFor) {
        // parse duration strings to compare
        const parseMin = (ef) => {
          const next = ef.next;
          if (!next) return 999;
          return parseInt(next.start.slice(0,2))*60 + parseInt(next.start.slice(2));
        };
        return parseMin(b.emptyFor) - parseMin(a.emptyFor);
      }
      return 0;
    });

    return results;
  }, [zone, day, timeSlot, search, typeFilter]);

  const totalVenues = Object.values(VENUES).filter(v => zone === 'ALL' || v.zone === zone).length;
  const occupancyPct = Math.round(((totalVenues - availableRooms.length) / Math.max(totalVenues, 1)) * 100);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center">
              <Ghost size={20} className="text-cyan-500" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-slate-900 dark:text-white">Ghost Room Finder</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Find empty classrooms &amp; study spaces across campus
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-navy-800/60 rounded-2xl border border-slate-200 dark:border-navy-700/60 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {/* Zone */}
            <div>
              <label className="label-text block mb-1.5">Faculty / Zone</label>
              <select
                value={zone}
                onChange={e => setZone(e.target.value)}
                className="input-field"
              >
                {ZONES.map(z => (
                  <option key={z.id} value={z.id}>{z.label}</option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="label-text block mb-1.5">Day</label>
              <select
                value={day}
                onChange={e => setDay(e.target.value)}
                className="input-field"
              >
                {DAYS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="label-text block mb-1.5">Time Block</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="input-field"
              >
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{formatTime(t)}</option>
                ))}
              </select>
            </div>

            {/* Room type filter */}
            <div>
              <label className="label-text block mb-1.5">Room Type</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="input-field"
              >
                {venueTypes.map(t => (
                  <option key={t} value={t}>{t === 'ALL' ? 'All Types' : t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search + Live now */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by room or building…"
                className="input-field pl-9"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              )}
            </div>
            <button onClick={setLiveNow} className="btn-secondary shrink-0 gap-2">
              <LocateFixed size={14} className="text-emerald-500" />
              <span className="hidden sm:inline">Now</span>
            </button>
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {availableRooms.length}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              rooms available{zone !== 'ALL' ? ` in ${zone}` : ''} · {day} at {formatTime(timeSlot)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-navy-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-rose-500 transition-all duration-500"
                style={{ width: `${occupancyPct}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">{occupancyPct}% occupied</span>
          </div>
        </div>

        {/* Room grid */}
        {availableRooms.length === 0 ? (
          <NoRoomsState zone={zone} day={day} timeSlot={timeSlot} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                schedule={SCHEDULES[room.id] || {}}
                day={day}
                timeSlot={timeSlot}
              />
            ))}
          </div>
        )}

        {/* Data disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-navy-800/40 border border-slate-200 dark:border-navy-700/40">
          <div className="flex items-start gap-2.5">
            <SlidersHorizontal size={14} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">About this data</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Room schedules are based on representative NUSMods timetable data for AY2024/25 Semester 1.
                Actual room availability may differ due to ad-hoc bookings, exams, or events.
                Always verify on <a href="https://nusmods.com/venues" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">NUSMods Venues</a> before heading over.
                Community reports reset per session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoRoomsState({ zone, day, timeSlot }) {
  return (
    <div className="flex flex-col items-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-navy-800 flex items-center justify-center mx-auto mb-4">
        <Building2 size={28} className="text-slate-300 dark:text-navy-600" />
      </div>
      <h3 className="font-display text-lg text-slate-600 dark:text-slate-400 mb-2">No rooms available</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
        All tracked venues in {zone === 'ALL' ? 'this zone' : zone} are occupied on {day} at {formatTime(timeSlot)}.
        Try a different time block or zone.
      </p>
    </div>
  );
}
