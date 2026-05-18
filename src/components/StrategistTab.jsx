import { useState, useRef } from 'react';
import { Plus, Search, Link2, X, Shield, RefreshCw, Calendar } from 'lucide-react';
import { RiskCard } from './RiskCard';
import { Timetable } from './Timetable';
import { ClashAlert } from './ClashAlert';

export function StrategistTab({ modules, loading, fetchModule, removeModule, parseNUSModsUrl, clashes }) {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('risk'); // 'risk' | 'timetable'
  const inputRef = useRef(null);

  const isNUSModsUrl = input.includes('nusmods.com/timetable');
  const anyLoading = Object.keys(loading).length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;

    if (isNUSModsUrl) {
      const codes = parseNUSModsUrl(val);
      if (codes.length === 0) {
        // Still try to extract from URL string
        const match = val.match(/[A-Z]{2,4}\d{4}[A-Z]?(?=[=&?]|$)/g);
        if (match) match.forEach(code => fetchModule(code));
      } else {
        codes.forEach(code => fetchModule(code));
      }
    } else {
      // Support comma/space separated codes
      const codes = val.split(/[\s,;]+/).filter(Boolean);
      codes.forEach(code => fetchModule(code));
    }
    setInput('');
  }

  const highRisk = modules.filter(m => m.risk?.level === 'HIGH').length;
  const medRisk = modules.filter(m => m.risk?.level === 'MEDIUM').length;
  const lowRisk = modules.filter(m => m.risk?.level === 'LOW').length;
  const totalMC = modules.reduce((sum, m) => sum + (parseFloat(m.data?.moduleCredit) || 0), 0);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <Shield size={20} className="text-blue-500" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-slate-900 dark:text-white">Bidding Strategist</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">CourseReg risk analysis &amp; clash detection</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                {isNUSModsUrl ? <Link2 size={15} className="text-blue-500" /> : <Search size={15} />}
              </div>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Add module codes (CS1010, MA1521) or paste NUSMods URL…"
                className="input-field pl-10"
                disabled={anyLoading}
                spellCheck={false}
                autoComplete="off"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || anyLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {anyLoading ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Plus size={15} />
              )}
              {isNUSModsUrl ? 'Import URL' : 'Add'}
            </button>
          </form>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 ml-1">
            Supports multiple codes separated by commas, or paste a NUSMods share URL
          </p>
        </div>

        {/* Loading indicators */}
        {Object.keys(loading).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(loading).map(code => (
              <div key={code} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                <RefreshCw size={11} className="text-blue-500 animate-spin" />
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400">Fetching {code}…</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats row */}
        {modules.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            <StatPill label="Modules" value={modules.length} color="blue" />
            <StatPill label="Total MCs" value={totalMC} color="cyan" />
            <StatPill label="High Risk" value={highRisk} color={highRisk > 0 ? 'rose' : 'slate'} />
            <StatPill label="Clashes" value={clashes.length} color={clashes.length > 0 ? 'amber' : 'slate'} />
          </div>
        )}

        {/* Clash alerts */}
        {clashes.length > 0 && (
          <div className="mb-5">
            <ClashAlert clashes={clashes} />
          </div>
        )}

        {/* Tab switcher */}
        {modules.length > 0 && (
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-navy-800 rounded-xl mb-5 w-fit">
            {[
              { id: 'risk', label: 'Risk Analysis', icon: Shield },
              { id: 'timetable', label: 'Timetable View', icon: Calendar },
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${tab === t.id
                      ? 'bg-white dark:bg-navy-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }
                  `}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        {modules.length === 0 ? (
          <EmptyState />
        ) : tab === 'risk' ? (
          <div className="space-y-3">
            {/* Sort: HIGH first */}
            {[...modules]
              .sort((a, b) => {
                const order = { HIGH: 0, MEDIUM: 1, LOW: 2, UNKNOWN: 3 };
                return (order[a.risk?.level] ?? 3) - (order[b.risk?.level] ?? 3);
              })
              .map(mod => (
                <RiskCard key={mod.code} module={mod} onRemove={removeModule} />
              ))
            }
          </div>
        ) : (
          <div className="bg-white dark:bg-navy-800/50 rounded-2xl border border-slate-200 dark:border-navy-700/60 p-4">
            <Timetable modules={modules} />
          </div>
        )}
      </div>
    </div>
  );
}

function StatPill({ label, value, color }) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/40',
    rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/40',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
    slate: 'bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-navy-700',
  };

  return (
    <div className={`rounded-xl border px-3 py-2.5 ${colors[color] || colors.slate}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70 mb-0.5">{label}</p>
      <p className="text-xl font-bold font-mono">{value}</p>
    </div>
  );
}

function EmptyState() {
  const EXAMPLES = ['CS1010', 'MA1521', 'GEA1000', 'DSA1101', 'CS2040S'];

  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mx-auto mb-4">
        <Shield size={28} className="text-blue-400" />
      </div>
      <h3 className="font-display text-xl text-slate-700 dark:text-slate-300 mb-2">Ready to analyze</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 max-w-xs mx-auto">
        Add your module codes to get CourseReg risk scores, clash detection, and bidding strategies.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {EXAMPLES.map(code => (
          <span key={code} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-navy-700">
            {code}
          </span>
        ))}
      </div>
    </div>
  );
}
