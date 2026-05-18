import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_STYLES = {
  success: {
    bg: 'bg-emerald-950 dark:bg-emerald-950 border-emerald-700',
    text: 'text-emerald-100',
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
  },
  error: {
    bg: 'bg-rose-950 dark:bg-rose-950 border-rose-700',
    text: 'text-rose-100',
    icon: XCircle,
    iconColor: 'text-rose-400',
  },
  warning: {
    bg: 'bg-amber-950 dark:bg-amber-950 border-amber-700',
    text: 'text-amber-100',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
  },
  info: {
    bg: 'bg-navy-800 dark:bg-navy-800 border-navy-600',
    text: 'text-slate-200',
    icon: Info,
    iconColor: 'text-blue-400',
  },
};

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none" role="region" aria-label="Notifications">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const Icon = style.icon;

  return (
    <div
      className={`
        pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border
        shadow-2xl max-w-sm backdrop-blur-sm
        ${style.bg} ${style.text}
        ${toast.removing ? 'animate-toast-out' : 'animate-toast-in'}
      `}
      role="alert"
    >
      <Icon size={16} className={`mt-0.5 shrink-0 ${style.iconColor}`} />
      <p className="text-sm leading-relaxed flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
