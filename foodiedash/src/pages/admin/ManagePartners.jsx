import { useState } from 'react';
import { Plus, Edit3, Trash2, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

export default function ManagePartners() {
  const partners = useStore(s => s.deliveryPartners);
  const addDeliveryPartner = useStore(s => s.addDeliveryPartner);
  const updateDeliveryPartner = useStore(s => s.updateDeliveryPartner);
  const deleteDeliveryPartner = useStore(s => s.deleteDeliveryPartner);
  const togglePartnerAvailability = useStore(s => s.togglePartnerAvailability);
  const addNotification = useStore(s => s.addNotification);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', vehicle: 'Motorcycle', price: '', time: '', timeMinutes: '', avatar: '🏍️', avatarBg: 'linear-gradient(135deg, #ff6b35, #ff8f65)' });

  const avatarOptions = [
    { emoji: '🏍️', bg: 'linear-gradient(135deg, #ff6b35, #ff8f65)' },
    { emoji: '🚗', bg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { emoji: '🛵', bg: 'linear-gradient(135deg, #00d97e, #34e89e)' },
    { emoji: '🚴', bg: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  ];

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', vehicle: 'Motorcycle', price: '', time: '', timeMinutes: '', avatar: '🏍️', avatarBg: 'linear-gradient(135deg, #ff6b35, #ff8f65)' });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, vehicle: p.vehicle, price: p.price.toString(), time: p.time, timeMinutes: p.timeMinutes?.toString() || '', avatar: p.avatar, avatarBg: p.avatarBg });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form, price: parseFloat(form.price) || 0, timeMinutes: parseInt(form.timeMinutes) || 20, available: true };
    if (!data.name) return;
    if (editing) {
      updateDeliveryPartner(editing, data);
      addNotification('Partner updated', `${data.name} updated`, 'success');
    } else {
      addDeliveryPartner(data);
      addNotification('Partner added', `${data.name} added`, 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Remove ${name}?`)) {
      deleteDeliveryPartner(id);
      addNotification('Partner removed', `${name} has been removed`, 'info');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Delivery Partners</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {partners.filter(p => p.available).length} available / {partners.length} total
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Partner
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Vehicle</th>
              <th>Rating</th>
              <th>Deliveries</th>
              <th>Fee</th>
              <th>ETA</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                      {p.avatar}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
                  </div>
                </td>
                <td>{p.vehicle}</td>
                <td><Star size={12} style={{ color: 'var(--accent-yellow)', verticalAlign: 'middle' }} fill="currentColor" /> {p.rating}</td>
                <td>{p.deliveries.toLocaleString()}</td>
                <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>${p.price}</td>
                <td>{p.time}</td>
                <td>
                  <div className={`toggle ${p.available ? 'active' : ''}`} onClick={() => togglePartnerAvailability(p.id)} />
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-icon btn-secondary" onClick={() => openEdit(p)}><Edit3 size={14} /></button>
                    <button className="btn btn-icon btn-danger" onClick={() => handleDelete(p.id, p.name)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
            <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{editing ? 'Edit Partner' : 'Add Partner'}</h3>
                <button onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Partner name" />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {avatarOptions.map(opt => (
                    <button
                      key={opt.emoji}
                      className={`filter-chip ${form.avatar === opt.emoji ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, avatar: opt.emoji, avatarBg: opt.bg, vehicle: opt.emoji === '🏍️' ? 'Motorcycle' : opt.emoji === '🚗' ? 'Car' : opt.emoji === '🛵' ? 'Scooter' : 'Bicycle' })}
                    >
                      {opt.emoji} {opt.emoji === '🏍️' ? 'Motorcycle' : opt.emoji === '🚗' ? 'Car' : opt.emoji === '🛵' ? 'Scooter' : 'Bicycle'}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Delivery Fee (?)</label>
                  <input className="input-field" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="3.99" />
                </div>
                <div className="form-group">
                  <label>ETA (minutes)</label>
                  <input className="input-field" value={form.timeMinutes} onChange={e => setForm({ ...form, timeMinutes: e.target.value, time: `${Math.max(0,(parseInt(e.target.value)||0)-5)}${(parseInt(e.target.value)||0)+5} min` })} placeholder="20" />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save' : 'Add Partner'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
