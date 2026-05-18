import { Zap, AlertTriangle } from 'lucide-react';

export function ClashAlert({ clashes }) {
  if (!clashes || clashes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 p-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-rose-500" />
        <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400">
          {clashes.length} Schedule Clash{clashes.length > 1 ? 'es' : ''} Detected
        </h3>
      </div>

      <div className="space-y-2">
        {clashes.map((clash, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/60 dark:bg-rose-900/10 border border-rose-200/50 dark:border-rose-800/30">
            <AlertTriangle size={13} className="text-rose-500 mt-0.5 shrink-0" />
            <div className="text-xs text-rose-700 dark:text-rose-300">
              <span className="font-mono font-bold">{clash.a.moduleCode}</span>
              <span className="mx-1">{clash.a.lessonType?.slice(0,3)} [{clash.a.classNo}]</span>
              <span className="opacity-60">↔</span>
              <span className="font-mono font-bold mx-1">{clash.b.moduleCode}</span>
              <span>{clash.b.lessonType?.slice(0,3)} [{clash.b.classNo}]</span>
              <span className="ml-1 opacity-70">
                · {clash.a.day?.slice(0, 3)} {clash.a.startTime.slice(0,2)}:{clash.a.startTime.slice(2)}–{clash.a.endTime.slice(0,2)}:{clash.a.endTime.slice(2)}
              </span>
              {clash.isHidden && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded text-[9px] font-bold uppercase">
                  Alternate-week clash
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
