import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, DollarSign, Award, Zap, TrendingDown, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function DeliveryPartners() {
  const navigate = useNavigate();
  const partners = useStore(s => s.deliveryPartners);
  const selectedPartner = useStore(s => s.selectedPartner);
  const selectPartner = useStore(s => s.selectPartner);
  const cart = useStore(s => s.cart);

  const available = partners.filter(p => p.available);

  // Compute badges: Best Choice, Fastest, Cheapest
  const badges = useMemo(() => {
    if (available.length === 0) return {};
    const fastest = available.reduce((a, b) => a.timeMinutes < b.timeMinutes ? a : b);
    const cheapest = available.reduce((a, b) => a.price < b.price ? a : b);
    // Best = highest weighted score (rating * 0.4 + speed * 0.3 + price * 0.3)
    const maxTime = Math.max(...available.map(p => p.timeMinutes));
    const maxPrice = Math.max(...available.map(p => p.price));
    const scores = available.map(p => ({
      id: p.id,
      score: (p.rating / 5) * 40 + ((maxTime - p.timeMinutes) / maxTime) * 30 + ((maxPrice - p.price) / maxPrice) * 30,
    }));
    const best = scores.reduce((a, b) => a.score > b.score ? a : b);

    const b = {};
    b[best.id] = { label: 'Best Choice', className: 'best-choice', icon: Award };
    if (fastest.id !== best.id) b[fastest.id] = { label: 'Fastest', className: 'fastest', icon: Zap };
    if (cheapest.id !== best.id && cheapest.id !== fastest.id) b[cheapest.id] = { label: 'Cheapest', className: 'cheapest', icon: TrendingDown };
    return b;
  }, [available]);

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state">
          <div className="empty-state-icon">🛵</div>
          <h3>Add items to your cart first</h3>
          <p>You need items in your cart before selecting a delivery partner.</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/restaurants')}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.button
          className="btn btn-ghost"
          onClick={() => navigate('/cart')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={18} /> Back to Cart
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ fontSize: 36 }}>
            🛵 Choose Your <span>Delivery Partner</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32, maxWidth: 500 }}>
            Select from our top-rated delivery partners. We've highlighted the best options for you!
          </p>
        </motion.div>

        <div className="grid-partners">
          {available.map((partner, i) => {
            const badge = badges[partner.id];
            const isSelected = selectedPartner === partner.id;

            return (
              <motion.div
                key={partner.id}
                className={`partner-card ${isSelected ? 'selected' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectPartner(partner.id)}
                id={`partner${partner.id}`}
              >
                {badge && (
                  <motion.span
                    className={`partner-badge ${badge.className}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  >
                    <badge.icon size={12} style={{ marginRight: 4 }} />
                    {badge.label}
                  </motion.span>
                )}

                <div className="select-indicator">
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={14} color="white" />
                    </motion.div>
                  )}
                </div>

                <div className="partner-header">
                  <div className="partner-avatar" style={{ background: partner.avatarBg }}>
                    {partner.avatar}
                  </div>
                  <div>
                    <div className="partner-name">{partner.name}</div>
                    <div className="partner-vehicle">{partner.vehicle}</div>
                  </div>
                </div>

                <div className="partner-stats">
                  <div className="partner-stat">
                    <div className="stat-value" style={{ color: 'var(--accent-yellow)' }}>
                      <Star size={14} style={{ verticalAlign: 'middle', marginRight: 2 }} fill="currentColor" />
                      {partner.rating}
                    </div>
                    <div className="stat-label">Rating</div>
                  </div>
                  <div className="partner-stat">
                    <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>
                      {partner.time}
                    </div>
                    <div className="stat-label">ETA</div>
                  </div>
                  <div className="partner-stat">
                    <div className="stat-value" style={{ color: 'var(--accent-green)' }}>
                      {partner.price}
                    </div>
                    <div className="stat-label">Fee</div>
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  marginTop: 12,
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}>
                  {partner.deliveries.toLocaleString()} deliveries completed
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Continue Button ───────────────────────── */}
        <motion.div
          style={{ textAlign: 'center', marginTop: 40 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            className="btn btn-primary btn-lg"
            disabled={!selectedPartner}
            onClick={() => navigate('/payment')}
            style={{
              opacity: selectedPartner ? 1 : 0.5,
              cursor: selectedPartner ? 'pointer' : 'not-allowed',
              boxShadow: selectedPartner ? '0 8px 32px rgba(255,107,53,0.4)' : 'none',
            }}
            id="continue-to-payment"
          >
            Continue to Payment <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
