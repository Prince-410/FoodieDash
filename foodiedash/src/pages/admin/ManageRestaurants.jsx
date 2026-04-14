import { useState } from 'react';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

export default function ManageRestaurants() {
  const restaurants = useStore(s => s.restaurants);
  const addRestaurant = useStore(s => s.addRestaurant);
  const updateRestaurant = useStore(s => s.updateRestaurant);
  const deleteRestaurant = useStore(s => s.deleteRestaurant);
  const addNotification = useStore(s => s.addNotification);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', cuisine: '', image: '', deliveryTime: '', deliveryFee: '', priceRange: '??', address: '', description: '' });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', cuisine: '', image: '', deliveryTime: '', deliveryFee: '', priceRange: '??', address: '', description: '' });
    setModalOpen(true);
  };

  const openEdit = (r) => {
    setEditing(r.id);
    setForm({ name: r.name, cuisine: r.cuisine, image: r.image, deliveryTime: r.deliveryTime, deliveryFee: r.deliveryFee?.toString() || '', priceRange: r.priceRange, address: r.address || '', description: r.description || '' });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form, deliveryFee: parseFloat(form.deliveryFee) || 2.99 };
    if (!data.name) return;
    if (editing) {
      updateRestaurant(editing, data);
      addNotification('Restaurant updated', `${data.name} has been updated`, 'success');
    } else {
      addRestaurant(data);
      addNotification('Restaurant added', `${data.name} has been added`, 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      deleteRestaurant(id);
      addNotification('Restaurant deleted', `${name} has been removed`, 'info');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Restaurants</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{restaurants.length} restaurants</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Restaurant
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Cuisine</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={r.image} alt={r.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</span>
                  </div>
                </td>
                <td>{r.cuisine}</td>
                <td>⭐ {r.rating}</td>
                <td>{r.priceRange}</td>
                <td>{r.deliveryTime}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-icon btn-secondary" onClick={() => openEdit(r)}>
                      <Edit3 size={14} />
                    </button>
                    <button className="btn btn-icon btn-danger" onClick={() => handleDelete(r.id, r.name)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{editing ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
                <button onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>
                  <X size={20} />
                </button>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Restaurant name" />
              </div>
              <div className="form-group">
                <label>Cuisine</label>
                <input className="input-field" value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })} placeholder="Italian • Pizza • Pasta" />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="input-field" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Delivery Time</label>
                  <input className="input-field" value={form.deliveryTime} onChange={e => setForm({ ...form, deliveryTime: e.target.value })} placeholder="20-30 min" />
                </div>
                <div className="form-group">
                  <label>Delivery Fee (?)</label>
                  <input className="input-field" value={form.deliveryFee} onChange={e => setForm({ ...form, deliveryFee: e.target.value })} placeholder="2.99" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Price Range</label>
                  <select className="select-field" value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })}>
                    <option value="?">?</option>
                    <option value="??">??</option>
                    <option value="???">???</option>
                    <option value="????">????</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input className="input-field" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="123 Main St" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input-field" rows={3} style={{ resize: 'vertical' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Restaurant description..." />
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Restaurant'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
