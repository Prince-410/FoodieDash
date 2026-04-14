import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const paymentMethods = [
  { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', icon: '💳', iconComponent: CreditCard },
  { id: 'upi', name: 'Digital Wallet', desc: 'Apple Pay, Google Pay', icon: '📱', iconComponent: Smartphone },
  { id: 'cash', name: 'Cash on Delivery', desc: 'Pay when your food arrives', icon: '💵', iconComponent: Banknote },
];

export default function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const cart = useStore(s => s.cart);
  const getCartTotal = useStore(s => s.getCartTotal);
  const getDiscount = useStore(s => s.getDiscount);
  const selectedPartner = useStore(s => s.selectedPartner);
  const deliveryPartners = useStore(s => s.deliveryPartners);
  const placeOrder = useStore(s => s.placeOrder);

  const partner = deliveryPartners.find(p => p.id === selectedPartner);
  const subtotal = getCartTotal();
  const discount = getDiscount();
  const deliveryFee = partner ? partner.price : 40;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = placeOrder(selectedMethod);
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/tracking/${orderId}`);
      }, 2500);
    }, 2000);
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state">
          <div className="empty-state-icon">💳</div>
          <h3>Nothing to pay for</h3>
          <p>Add items to your cart and proceed to checkout.</p>
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
        <AnimatePresence>
          {success && (
            <motion.div
              className="success-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="success-icon-wrapper">
                <CheckCircle size={48} color="white" />
              </div>
              <h2>Order Placed! 🎉</h2>
              <p>Redirecting to order tracking...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="btn btn-ghost"
          onClick={() => navigate('/delivery-partners')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={18} /> Back
        </motion.button>

        <motion.h1
          className="section-title"
          style={{ fontSize: 36 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💳 <span>Payment</span>
        </motion.h1>

        <div className="payment-layout">
          {/* ─── Payment Methods ────────────────────── */}
          <motion.div
            className="payment-methods"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Select Payment Method</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              All transactions are secure and encrypted
            </p>

            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <h4>{method.name}</h4>
                  <p>{method.desc}</p>
                </div>
                <div className="method-radio" />
              </motion.div>
            ))}

            {selectedMethod === 'card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  padding: 20,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div className="form-group">
                  <label>Card Number</label>
                  <input className="input-field" placeholder="4242 4242 4242 4242" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label>Expiry</label>
                    <input className="input-field" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input className="input-field" placeholder="123" type="password" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input className="input-field" placeholder="John Doe" />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ─── Order Summary ──────────────────────── */}
          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Order Summary</h3>

            <div style={{ marginBottom: 16 }}>
              {cart.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row" style={{ color: 'var(--accent-green)' }}>
                <span>Discount</span>
                <span>-{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery ({partner?.name || 'Standard'})</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="total-price">₹{total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 20 }}
              onClick={handlePayment}
              disabled={processing}
              id="pay-now-btn"
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{ width: 18, height: 18, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={16} /> Pay ₹{total.toFixed(2)}
                </>
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Lock size={12} /> Secure payment — 256-bit SSL encryption
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
