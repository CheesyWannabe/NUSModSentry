import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StrategistTab } from './components/StrategistTab';
import { GhostRoomTab } from './components/GhostRoomTab';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { useModules } from './hooks/useModules';

export default function App() {
  const [activeTab, setActiveTab] = useState('strategist');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('modsentry_darkmode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return true; }
  });

  const { toasts, addToast, removeToast } = useToast();
  const { modules, loading, fetchModule, removeModule, parseNUSModsUrl, clashes } = useModules(addToast);

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try { localStorage.setItem('modsentry_darkmode', String(darkMode)); } catch {}
  }, [darkMode]);

  return (
    <div className={`flex h-screen overflow-hidden bg-slate-50 dark:bg-navy-950 font-body`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        moduleCount={modules.length}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 px-6 py-3 border-b border-slate-200 dark:border-navy-700/60 bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
              {activeTab === 'strategist' ? 'CourseReg Bidding Strategist & Risk Analyzer' : 'Ghost Room Finder'}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {activeTab === 'strategist'
                ? `AY2024–25 · ${modules.length} module${modules.length !== 1 ? 's' : ''} · ${clashes.length} clash${clashes.length !== 1 ? 'es' : ''}`
                : 'Dynamic campus study spaces · AY2024–25'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">NUSMods API live</span>
          </div>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'strategist' ? (
            <StrategistTab
              modules={modules}
              loading={loading}
              fetchModule={fetchModule}
              removeModule={removeModule}
              parseNUSModsUrl={parseNUSModsUrl}
              clashes={clashes}
            />
          ) : (
            <GhostRoomTab />
          )}
        </div>
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
