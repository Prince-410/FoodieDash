import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ChefHat, Bike, CheckCircle, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const steps = [
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'picked', label: 'Picked Up', icon: Package },
  { id: 'on_the_way', label: 'On the Way', icon: Bike },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const orders = useStore(s => s.orders);
  const updateOrderStatus = useStore(s => s.updateOrderStatus);
  
  const order = orders.find(o => o.id === orderId);

  // Simulate progress
  useEffect(() => {
    if (!order || order.status === 'delivered') return;

    const timer = setTimeout(() => {
      const transitions = {
        preparing: 'picked',
        picked: 'on_the_way',
        on_the_way: 'delivered',
      };
      const nextStatus = transitions[order.status];
      if (nextStatus) updateOrderStatus(orderId, nextStatus);
    }, 10000);

    return () => clearTimeout(timer);
  }, [order?.status, orderId, updateOrderStatus]);

  if (!order) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Order not found</h3>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/orders')}>
            My Orders
          </button>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(s => s.id === order.status);
  const progressPercent = ((currentStepIndex) / (steps.length - 1)) * 100;

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.button
          className="btn btn-ghost"
          onClick={() => navigate('/orders')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={18} /> Back to Orders
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="tracking-container"
        >
          <div className="tracking-header">
            <div>
              <h1 style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 800 }}>Track Order</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>ID: {orderId} • {order.restaurant}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Estimated Delivery</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-green)' }}>25-35 mins</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="tracking-progress">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isActive = index === currentStepIndex;
              return (
                <div 
                  key={step.id} 
                  className={`tracking-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="step-icon">
                    <step.icon size={20} />
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
              );
            })}
          </div>

          <div className="tracking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, marginTop: 40 }}>
            <div className="tracking-main">
              <div style={{ background: 'var(--bg-glass)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Delivery Details</h3>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
                    <MapPin size={20} color="var(--accent-orange)" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>Delivery Address</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>45, Shanti Nagar, MG Road, Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                {order.partnerId && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-orange-soft)', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0, fontSize: 20 }}>
                      👤
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{order.partnerName || 'Assigning Partner...'}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your Delivery Hero</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{ height: 36, width: 36, padding: 0 }}>
                      <Phone size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="tracking-side">
              <div style={{ background: 'var(--bg-secondary)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>Total Paid</span>
                    <span style={{ color: 'var(--accent-orange)' }}>{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
