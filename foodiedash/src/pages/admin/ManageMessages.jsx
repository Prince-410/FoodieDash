import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import useStore from '../../store/useStore';

export default function ManageMessages() {
  const messages = useStore(s => s.messages);
  const deleteMessage = useStore(s => s.deleteMessage);
  
  // Local state to track which messages are "read"
  const [readMessages, setReadMessages] = useState([]);

  const toggleRead = (id) => {
    if (readMessages.includes(id)) {
      setReadMessages(readMessages.filter(mId => mId !== id));
    } else {
      setReadMessages([...readMessages, id]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 className="section-title" style={{ margin: 0, fontSize: 24 }}>User <span>Messages</span></h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          {messages.length} total messages
        </div>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <Mail size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence>
              {messages.map(msg => {
                const isRead = readMessages.includes(msg.id);
                return (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    style={{
                      padding: 20,
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--bg-glass-heavy)',
                      border: `1px solid ${isRead ? 'var(--border-subtle)' : 'var(--accent-orange)'}`,
                      opacity: isRead ? 0.6 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{msg.subject}</h3>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          From: <strong>{msg.name}</strong> ({msg.email})
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {new Date(msg.date).toLocaleDateString()}
                        </span>
                        <button 
                          className="btn btn-ghost btn-sm" 
                          onClick={() => toggleRead(msg.id)}
                          style={{ color: isRead ? 'var(--accent-green)' : 'var(--text-muted)' }}
                          title={isRead ? "Mark as unread" : "Mark as read"}
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button 
                          className="btn btn-ghost btn-sm" 
                          onClick={() => {
                            if (window.confirm("Delete this message?")) deleteMessage(msg.id);
                          }}
                          style={{ color: 'var(--accent-red)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
