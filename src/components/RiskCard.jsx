import { AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, X, Lightbulb, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';

const RISK_CONFIG = {
  HIGH: {
    badge: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
    icon: XCircle,
    iconColor: 'text-rose-500',
    glow: 'shadow-rose-500/10',
    label: 'HIGH RISK',
    bar: 'bg-rose-500',
    barW: 'w-full',
  },
  MEDIUM: {
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    glow: 'shadow-amber-500/10',
    label: 'MEDIUM RISK',
    bar: 'bg-amber-500',
    barW: 'w-2/3',
  },
  LOW: {
    badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    glow: 'shadow-emerald-500/10',
    label: 'LOW RISK',
    bar: 'bg-emerald-500',
    barW: 'w-1/3',
  },
  UNKNOWN: {
    badge: 'bg-slate-500/15 text-slate-500 border border-slate-500/20',
    icon: AlertTriangle,
    iconColor: 'text-slate-500',
    glow: '',
    label: 'UNKNOWN',
    bar: 'bg-slate-500',
    barW: 'w-1/4',
  },
};

export function RiskCard({ module, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const { code, data, risk } = module;
  const cfg = RISK_CONFIG[risk.level] || RISK_CONFIG.UNKNOWN;
  const Icon = cfg.icon;

  const sem1 = data?.semesterData?.find(s => s.semester === 1) || data?.semesterData?.[0];
  const timetable = sem1?.timetable || [];
  const tutorialTypes = [...new Set(timetable
    .filter(s => ['Tutorial', 'Laboratory', 'Recitation', 'Seminar-Style Module Class'].includes(s.lessonType))
    .map(s => s.lessonType))];

  return (
    <div className={`
      relative rounded-2xl border overflow-hidden
      bg-white dark:bg-navy-800/80
      border-slate-200 dark:border-navy-700/60
      shadow-sm hover:shadow-md
      transition-all duration-200 animate-slide-up
    `}>
      {/* Risk level color strip */}
      <div className={`h-1 ${cfg.bar} ${cfg.barW} transition-all duration-700`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.badge.includes('rose') ? 'bg-rose-500/10' : cfg.badge.includes('amber') ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
              <Icon size={18} className={cfg.iconColor} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-base text-slate-900 dark:text-white">{code}</span>
                <span className={`risk-badge text-[10px] ${cfg.badge}`}>{cfg.label}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {data?.title || '—'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors text-slate-400"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={() => onRemove(code)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors text-slate-400 hover:text-rose-500"
              aria-label={`Remove ${code}`}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Compact stats */}
        <div className="flex items-center gap-4 mt-3">
          {data?.moduleCredit && (
            <div className="flex items-center gap-1">
              <BookOpen size={11} className="text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">{data.moduleCredit} MCs</span>
            </div>
          )}
          {timetable.length > 0 && (
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">{timetable.length} slots</span>
            </div>
          )}
          {tutorialTypes.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {tutorialTypes.map(t => (
                <span key={t} className="text-[10px] bg-slate-100 dark:bg-navy-700 text-slate-500 dark:text-slate-400 rounded px-1.5 py-0.5 font-mono">
                  {t.slice(0, 3).toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Reasons */}
        {risk.reasons && risk.reasons.length > 0 && (
          <div className="mt-3 space-y-1">
            {risk.reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${cfg.bar}`} />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expandable: mitigation + timetable details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-700/50 space-y-4 animate-fade-in">
            {/* Mitigation strategies */}
            {risk.suggestions && risk.suggestions.length > 0 && (
              <div>
                <p className="label-text mb-2">Mitigation Strategy</p>
                <div className="space-y-2">
                  {risk.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                      <Lightbulb size={12} className="text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tutorial slots breakdown */}
            {timetable.length > 0 && (
              <div>
                <p className="label-text mb-2">Lesson Slots</p>
                <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-hide">
                  {timetable.map((slot, i) => {
                    const isPeak = parseInt(slot.startTime.slice(0, 2)) >= 12 && parseInt(slot.startTime.slice(0, 2)) < 14;
                    return (
                      <div key={i} className={`
                        flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs
                        ${isPeak ? 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30' : 'bg-slate-50 dark:bg-navy-900/50'}
                      `}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 dark:text-slate-400 w-20 truncate">
                            {slot.lessonType?.replace('Seminar-Style Module Class', 'Seminar').slice(0, 8)}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">[{slot.classNo}]</span>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <span className="text-slate-500 dark:text-slate-400 w-8 truncate">{slot.day?.slice(0, 3)}</span>
                          <span className="font-mono text-slate-600 dark:text-slate-300">
                            {slot.startTime.slice(0,2)}:{slot.startTime.slice(2)}–{slot.endTime.slice(0,2)}:{slot.endTime.slice(2)}
                          </span>
                          {isPeak && <span className="text-amber-500 text-[10px] font-bold">PEAK</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {data?.description && (
              <div>
                <p className="label-text mb-1.5">Module Description</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {data.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
