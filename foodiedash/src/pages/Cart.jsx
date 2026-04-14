import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, X, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

export default function Cart() {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const cart = useStore(s => s.cart);
  const updateCartQuantity = useStore(s => s.updateCartQuantity);
  const removeFromCart = useStore(s => s.removeFromCart);
  const clearCart = useStore(s => s.clearCart);
  const getCartTotal = useStore(s => s.getCartTotal);
  const appliedCoupon = useStore(s => s.appliedCoupon);
  const applyCoupon = useStore(s => s.applyCoupon);
  const removeCoupon = useStore(s => s.removeCoupon);
  const getDiscount = useStore(s => s.getDiscount);

  const subtotal = getCartTotal();
  const discount = getDiscount();
  const deliveryFee = subtotal > 300 ? 0 : 40;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-state-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious items from our restaurants to get started!</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 24 }}
              onClick={() => navigate('/restaurants')}
            >
              <ShoppingBag size={18} /> Browse Restaurants
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h1 className="section-title" style={{ fontSize: 36, marginBottom: 0 }}>
              🛒 Your <span>Cart</span>
            </h1>
            <button className="btn btn-ghost" onClick={clearCart} style={{ color: 'var(--accent-red)' }}>
              <Trash2 size={16} /> Clear All
            </button>
          </div>

          <div className="cart-layout">
            {/* ─── Cart Items ──────────────────────────── */}
            <div className="cart-items">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                  >
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <div>
                        <h4>{item.name}</h4>
                        <p className="restaurant-name">{item.restaurantName}</p>
                      </div>
                      <div className="cart-item-bottom">
                        <span className="cart-item-price">{(item.price * item.quantity).toFixed(2)}</span>
                        <div className="quantity-control">
                          <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ─── Order Summary ────────────────────────── */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              {/* Coupon */}
              {appliedCoupon ? (
                <div className="coupon-applied">
                  <CheckCircle size={16} />
                  <span style={{ flex: 1 }}>{appliedCoupon.code} — {appliedCoupon.description}</span>
                  <button onClick={removeCoupon} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="coupon-form">
                  <input
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    id="coupon-input"
                  />
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => { applyCoupon(couponInput); setCouponInput(''); }}
                  >
                    <Tag size={14} /> Apply
                  </button>
                </div>
              )}

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
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span style={{ color: 'var(--accent-green)' }}>FREE</span> : `₹${deliveryFee.toFixed(2)}`}</span>
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
                onClick={() => navigate('/delivery-partners')}
                id="checkout-btn"
              >
                Choose Delivery <ArrowRight size={18} />
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
                Try codes: WELCOME20, SAVE50, FREEDEL
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
