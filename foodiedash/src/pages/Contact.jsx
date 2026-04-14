import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import useStore from '../store/useStore';

export default function Contact() {
  const addNotification = useStore(s => s.addNotification);
  const submitMessage = useStore(s => s.submitMessage);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addNotification('Error', 'Please fill in all required fields.', 'error');
      return;
    }
    
    setLoading(true);
    // Simulate sending network request
    setTimeout(() => {
      submitMessage(form.name, form.email, form.subject || 'General Inquiry', form.message);
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      addNotification('Message Sent!', 'We have received your message and will get back to you shortly.', 'success');
    }, 800);
  };

  return (
    <div className="page-wrapper" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ fontSize: 36, marginBottom: 8, textAlign: 'center' }}>
            Contact <span>Us</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 32 }}>
            Have a question, feedback, or a partnership inquiry? We'd love to hear from you.
          </p>

          <div className="glass-card" style={{ padding: 32, borderRadius: 'var(--radius-xl)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label>Your Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                  <input type="text" name="name" className="input-field" style={{ paddingLeft: 42 }} placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                  <input type="email" name="email" className="input-field" style={{ paddingLeft: 42 }} placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Subject</label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                  <input type="text" name="subject" className="input-field" style={{ paddingLeft: 42 }} placeholder="How can we help?" value={form.subject} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Message *</label>
                <textarea name="message" className="input-field" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} style={{ resize: 'vertical' }} required />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
                {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
