import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const statusColors = {
  preparing: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: 'Preparing' },
  picked: { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6', label: 'Picked Up' },
  on_the_way: { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', label: 'On the Way' },
  delivered: { bg: 'rgba(0,217,126,0.12)', color: '#00d97e', label: 'Delivered' },
};

export default function Orders() {
  const navigate = useNavigate();
  const orders = useStore(s => s.orders);
  const currentUser = useStore(s => s.currentUser);

  const myOrders = orders.filter(o => o.userId === currentUser?.id);

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ fontSize: 36 }}>
            📋 My <span>Orders</span>
          </h1>

          {myOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>No orders yet</h3>
              <p>Start ordering from your favorite restaurants!</p>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/restaurants')}>
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {myOrders.map((order, i) => {
                const status = statusColors[order.status] || statusColors.preparing;
                return (
                  <motion.div
                    key={order.id}
                    className="order-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="order-card-header">
                      <div>
                        <div className="order-id">{order.id}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                          {order.restaurant} • {order.date}
                        </div>
                      </div>
                      <span className="badge" style={{ background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </div>

                    <div className="order-card-items">
                      {order.items.map((item, j) => (
                        <div key={j} className="order-card-item">
                          <span>{item.name} × {item.quantity}</span>
                          <span>{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--accent-orange)' }}>
                          {order.total.toFixed(2)}
                        </span>
                        {order.partnerName && (
                          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                            • Delivered by {order.partnerName}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {order.status !== 'delivered' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/tracking/${order.id}`)}
                          >
                            <Clock size={14} /> Track
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate('/restaurants')}
                          >
                            <RotateCcw size={14} /> Reorder
                          </button>
                        )}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => navigate(`/tracking/${order.id}`)}
                        >
                          Details <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
