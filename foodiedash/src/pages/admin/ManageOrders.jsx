import { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

const statusOptions = [
  { value: 'preparing', label: 'Preparing', color: '#f59e0b' },
  { value: 'picked', label: 'Picked Up', color: '#8b5cf6' },
  { value: 'on_the_way', label: 'On the Way', color: '#3b82f6' },
  { value: 'delivered', label: 'Delivered', color: '#00d97e' },
];

export default function ManageOrders() {
  const orders = useStore(s => s.orders);
  const deliveryPartners = useStore(s => s.deliveryPartners);
  const updateOrderStatus = useStore(s => s.updateOrderStatus);
  const assignPartnerToOrder = useStore(s => s.assignPartnerToOrder);
  const addNotification = useStore(s => s.addNotification);

  const [statusFilter, setStatusFilter] = useState('');

  const filtered = statusFilter ? orders.filter(o => o.status === statusFilter) : orders;

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    addNotification('Status updated', `Order ${orderId} → ${status}`, 'success');
  };

  const handlePartnerAssign = (orderId, partnerId) => {
    assignPartnerToOrder(orderId, partnerId);
    const partner = deliveryPartners.find(p => p.id === partnerId);
    addNotification('Partner assigned', `${partner?.name} assigned to ${orderId}`, 'success');
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Orders</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{orders.length} total orders</p>
        </div>
        <div className="filters-bar" style={{ marginBottom: 0, padding: 0 }}>
          <button className={`filter-chip ${!statusFilter ? 'active' : ''}`} onClick={() => setStatusFilter('')}>All</button>
          {statusOptions.map(s => (
            <button key={s.value} className={`filter-chip ${statusFilter === s.value ? 'active' : ''}`} onClick={() => setStatusFilter(s.value)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Delivery Partner</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => {
              const st = statusOptions.find(s => s.value === order.status) || statusOptions[0];
              return (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{order.id}</td>
                  <td>{order.restaurant}</td>
                  <td>
                    <div style={{ maxWidth: 200 }}>
                      {order.items.map((item, i) => (
                        <span key={i} style={{ fontSize: 13 }}>
                          {item.name} ×{item.quantity}{i < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-orange)' }}>${order.total.toFixed(2)}</td>
                  <td>
                    <select
                      className="select-field"
                      style={{ width: 140, padding: '6px 10px', fontSize: 13, background: `${st.color}15`, color: st.color, borderColor: `${st.color}30` }}
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="select-field"
                      style={{ width: 160, padding: '6px 10px', fontSize: 13 }}
                      value={order.partnerId || ''}
                      onChange={e => handlePartnerAssign(order.id, e.target.value)}
                    >
                      <option value="">Assign Partner</option>
                      {deliveryPartners.filter(p => p.available).map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
