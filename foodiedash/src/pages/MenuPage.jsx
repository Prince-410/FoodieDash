import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const restaurants = useStore(s => s.restaurants);
  const allMenuItems = useStore(s => s.menuItems);
  const cart = useStore(s => s.cart);
  const addToCart = useStore(s => s.addToCart);
  const updateCartQuantity = useStore(s => s.updateCartQuantity);
  const getCartCount = useStore(s => s.getCartCount);

  const restaurant = restaurants.find(r => r.id === id);
  const items = allMenuItems.filter(m => m.restaurantId === id);
  const categories = ['All', ...new Set(items.map(m => m.category))];
  const filteredItems = activeCategory === 'All' ? items : items.filter(m => m.category === activeCategory);

  const getCartQty = (itemId) => {
    const cartItem = cart.find(c => c.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (!restaurant) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Restaurant not found</h3>
          <p>This restaurant doesn't exist or has been removed.</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/restaurants')}>
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* ─── Back Button ─────────────────────────────── */}
        <motion.button
          className="btn btn-ghost"
          onClick={() => navigate('/restaurants')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={18} /> Back to Restaurants
        </motion.button>

        {/* ─── Restaurant Header ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: 40,
          }}
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: '100%', height: 280, objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.3) 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
              {restaurant.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
              {restaurant.description}
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                <Star size={16} style={{ color: 'var(--accent-yellow)' }} fill="currentColor" />
                <strong>{restaurant.rating}</strong>
                <span style={{ color: 'var(--text-muted)' }}>({restaurant.reviews} reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
                <Clock size={16} /> {restaurant.deliveryTime}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
                <MapPin size={16} /> {restaurant.address}
              </div>
              <span className="badge badge-orange">{restaurant.priceRange}</span>
            </div>
          </div>
        </motion.div>

        {/* ─── Category Tabs ───────────────────────────── */}
        <div className="filters-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── Menu Items Grid ─────────────────────────── */}
        <div className="grid-menu">
          {filteredItems.map((item, i) => {
            const qty = getCartQty(item.id);
            return (
              <motion.div
                key={item.id}
                className="food-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                id={`menu-item-${item.id}`}
              >
                <div className="food-card-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  {item.popular && (
                    <span style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      padding: '4px 10px',
                      background: 'var(--gradient-orange)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'white',
                    }}>
                      🔥 Popular
                    </span>
                  )}
                </div>
                <div className="food-card-body">
                  <h4>{item.name}</h4>
                  <p className="food-desc">{item.description}</p>
                  <div className="food-card-footer">
                    <span className="food-price">₹{item.price.toFixed(2)}</span>
                    {qty > 0 ? (
                      <div className="quantity-control">
                        <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, qty - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="quantity-value">{qty}</span>
                        <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, qty + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(item, restaurant.id, restaurant.name)}
                      >
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Floating Cart Button ────────────────────── */}
        {getCartCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
            }}
          >
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/cart')}
              style={{ boxShadow: '0 8px 32px rgba(255,107,53,0.4)', paddingLeft: 28, paddingRight: 28 }}
            >
              <ShoppingCart size={18} />
              View Cart ({getCartCount()} items)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
