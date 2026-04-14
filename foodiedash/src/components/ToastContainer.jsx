import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import useStore from '../store/useStore';

export default function ToastContainer() {
  const notifications = useStore(s => s.notifications);
  const removeNotification = useStore(s => s.removeNotification);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  if (notifications.length === 0) return null;

  return (
    <div className="toast-container">
      {notifications.map(n => {
        const Icon = icons[n.type] || Info;
        return (
          <div key={n.id} className={`toast ${n.type}`}>
            <div className="toast-icon">
              <Icon size={18} />
            </div>
            <div className="toast-content">
              <div className="toast-title">{n.title}</div>
              <div className="toast-message">{n.message}</div>
            </div>
            <button className="toast-close" onClick={() => removeNotification(n.id)}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
