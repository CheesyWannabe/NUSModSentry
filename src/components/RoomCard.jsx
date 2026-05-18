import { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, Users, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';

export function RoomCard({ room, schedule, day, timeSlot }) {
  const [communityReport, setCommunityReport] = useState(() => {
    try {
      const key = `modsentry_room_${room.name}_${day}_${timeSlot}`;
      return localStorage.getItem(key) || null; // 'occupied' | 'empty' | null
    } catch { return null; }
  });

  function handleReport(type) {
    const newVal = communityReport === type ? null : type;
    setCommunityReport(newVal);
    try {
      const key = `modsentry_room_${room.name}_${day}_${timeSlot}`;
      if (newVal) localStorage.setItem(key, newVal);
      else localStorage.removeItem(key);
    } catch {}
  }

  const effectivelyAvailable = communityReport === 'occupied' ? false :
    communityReport === 'empty' ? true : true; // default: available (since we only show available rooms)

  function formatNextClass(next) {
    if (!next) return null;
    const h = parseInt(next.start.slice(0, 2));
    const m = next.start.slice(2);
    const ampm = h >= 12 ? 'pm' : 'am';
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${h12}:${m}${ampm} — ${next.module} ${next.type}`;
  }

  const communityOverrideActive = communityReport === 'occupied';

  return (
    <div className={`
      room-card animate-fade-in
      ${communityOverrideActive ? 'opacity-60 border-rose-300 dark:border-rose-800/50' : ''}
    `}>
      {/* Status dot */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`
            w-2 h-2 rounded-full shrink-0 mt-1
            ${communityOverrideActive ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse-slow'}
          `} />
          <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-white truncate">
            {room.name}
          </h3>
        </div>
        <span className={`
          shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
          ${communityOverrideActive
            ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
            : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
          }
        `}>
          {communityOverrideActive ? 'Reported Occupied' : 'Available'}
        </span>
      </div>

      {/* Room info */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400">{room.type} · {room.building}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={11} className="text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Cap. {room.capacity}</span>
        </div>
        {room.emptyFor && (
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Empty for <span className="font-semibold text-emerald-600 dark:text-emerald-400">{room.emptyFor.duration}</span>
              {room.emptyFor.next && (
                <span className="text-slate-400"> · then {formatNextClass(room.emptyFor.next)}</span>
              )}
            </span>
          </div>
        )}
        {!room.emptyFor && (
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-slate-400 shrink-0" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Free for the rest of the day</span>
          </div>
        )}
      </div>

      {/* Community reports */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100 dark:border-navy-700/50">
        <span className="text-[10px] text-slate-400 font-medium mr-1">Community:</span>
        <button
          onClick={() => handleReport('empty')}
          className={`
            flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all
            ${communityReport === 'empty'
              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-navy-700/60 text-slate-500 dark:text-slate-400 border border-transparent hover:border-emerald-300 dark:hover:border-emerald-800'
            }
          `}
          aria-label="Confirm room is empty"
        >
          <ThumbsUp size={10} />
          Confirm empty
        </button>
        <button
          onClick={() => handleReport('occupied')}
          className={`
            flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all
            ${communityReport === 'occupied'
              ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
              : 'bg-slate-100 dark:bg-navy-700/60 text-slate-500 dark:text-slate-400 border border-transparent hover:border-rose-300 dark:hover:border-rose-800'
            }
          `}
          aria-label="Report room as occupied"
        >
          <ThumbsDown size={10} />
          Report occupied
        </button>
      </div>
    </div>
  );
}
