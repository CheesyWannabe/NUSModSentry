import { BookOpen, Ghost, Moon, Sun, Shield, Github, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'strategist',
    icon: Shield,
    label: 'Bidding Strategist',
    sublabel: 'Risk & clash analysis',
  },
  {
    id: 'ghostrooms',
    icon: Ghost,
    label: 'Ghost Room Finder',
    sublabel: 'Empty study spaces',
  },
];

export function Sidebar({ activeTab, setActiveTab, darkMode, setDarkMode, moduleCount }) {
  return (
    <aside className="
      w-64 shrink-0 flex flex-col
      bg-navy-900 dark:bg-[#070f1f]
      border-r border-navy-700/50
      h-screen sticky top-0
    ">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 border-b border-navy-700/40">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue shrink-0">
            <BookOpen size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg text-white leading-none tracking-tight">ModSentry</h1>
            <p className="text-xs text-navy-300 mt-0.5 font-mono">NUS Academic Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="label-text px-2 mb-3">Navigation</p>

        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                sidebar-nav-item w-full group
                ${isActive
                  ? 'bg-blue-600/20 text-white border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-navy-700/50 text-slate-500 group-hover:text-slate-300'}
              `}>
                <Icon size={16} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className={`text-sm font-medium leading-tight ${isActive ? 'text-white' : ''}`}>{item.label}</p>
                <p className={`text-xs mt-0.5 leading-tight ${isActive ? 'text-blue-300/70' : 'text-slate-500'}`}>
                  {item.sublabel}
                </p>
              </div>
              {isActive && <ChevronRight size={14} className="text-blue-400 shrink-0" />}
              {item.id === 'strategist' && moduleCount > 0 && (
                <span className="shrink-0 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {moduleCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-navy-700/40 space-y-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="sidebar-nav-item w-full text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center shrink-0">
            {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-400" />}
          </div>
          <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-nav-item w-full text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent no-underline"
        >
          <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center shrink-0">
            <Github size={15} className="text-slate-500" />
          </div>
          <span className="text-sm">GitHub</span>
        </a>

        <div className="px-2 pt-2">
          <p className="text-[10px] text-navy-600 leading-relaxed">
            Data from NUSMods API · AY2024–25 · Not affiliated with NUS
          </p>
        </div>
      </div>
    </aside>
  );
}
