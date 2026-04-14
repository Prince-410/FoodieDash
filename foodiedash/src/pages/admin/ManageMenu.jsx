import { useState } from 'react';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

export default function ManageMenu() {
  const menuItems = useStore(s => s.menuItems);
  const restaurants = useStore(s => s.restaurants);
  const addMenuItem = useStore(s => s.addMenuItem);
  const updateMenuItem = useStore(s => s.updateMenuItem);
  const deleteMenuItem = useStore(s => s.deleteMenuItem);
  const addNotification = useStore(s => s.addNotification);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filterRestaurant, setFilterRestaurant] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', restaurantId: '', popular: false });

  const filtered = filterRestaurant ? menuItems.filter(m => m.restaurantId === filterRestaurant) : menuItems;

  const getRestName = (id) => restaurants.find(r => r.id === id)?.name || 'Unknown';

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', description: '', price: '', image: '', category: '', restaurantId: restaurants[0]?.id || '', popular: false });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, description: item.description, price: item.price.toString(), image: item.image, category: item.category, restaurantId: item.restaurantId, popular: item.popular });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form, price: parseFloat(form.price) || 0 };
    if (!data.name || !data.restaurantId) return;
    if (editing) {
      updateMenuItem(editing, data);
      addNotification('Item updated', `${data.name} has been updated`, 'success');
    } else {
      addMenuItem(data);
      addNotification('Item added', `${data.name} has been added`, 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      deleteMenuItem(id);
      addNotification('Item deleted', `${name} has been removed`, 'info');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Menu Items</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{menuItems.length} items total</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="select-field" style={{ width: 200 }} value={filterRestaurant} onChange={e => setFilterRestaurant(e.target.value)}>
            <option value="">All Restaurants</option>
            {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Restaurant</th>
              <th>Category</th>
              <th>Price</th>
              <th>Popular</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>{getRestName(item.restaurantId)}</td>
                <td><span className="badge badge-blue">{item.category}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--accent-orange)' }}>₹${item.price.toFixed(2)}</td>
                <td>{item.popular ? <span className="badge badge-orange">🔥 Popular</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-icon btn-secondary" onClick={() => openEdit(item)}><Edit3 size={14} /></button>
                    <button className="btn btn-icon btn-danger" onClick={() => handleDelete(item.id, item.name)}><Trash2 size={14} /></button>
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
                <h3>{editing ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                <button onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="form-group">
                <label>Restaurant</label>
                <select className="select-field" value={form.restaurantId} onChange={e => setForm({ ...form, restaurantId: e.target.value })}>
                  {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Item name" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input-field" rows={2} style={{ resize: 'vertical' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Item description" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Price (?)</label>
                  <input className="input-field" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="14.99" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Pizza, Sushi, etc." />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="input-field" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className={`toggle ${form.popular ? 'active' : ''}`} onClick={() => setForm({ ...form, popular: !form.popular })} />
                <label style={{ margin: 0 }}>Mark as Popular</label>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Item'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
