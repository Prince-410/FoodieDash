import { useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

export default function Favorites() {
  const navigate = useNavigate();
  const restaurants = useStore(s => s.restaurants);
  const favorites = useStore(s => s.favorites);
  const toggleFavorite = useStore(s => s.toggleFavorite);

  const favRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ fontSize: 36 }}>
            ❤️ Your <span>Favorites</span>
          </h1>

          {favRestaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💔</div>
              <h3>No favorites yet</h3>
              <p>Tap the heart icon on restaurants to save them here!</p>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/restaurants')}>
                Explore Restaurants
              </button>
            </div>
          ) : (
            <div className="grid-restaurants">
              <AnimatePresence>
                {favRestaurants.map((r, i) => (
                  <motion.div
                    key={r.id}
                    className="restaurant-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/restaurant/${r.id}`)}
                  >
                    <div className="restaurant-card-img" style={{ overflow: 'hidden' }}>
                      <img src={r.image} alt={r.name} loading="lazy" />
                      <div className="img-overlay" />
                      <div className="delivery-time">
                        <Clock size={12} /> {r.deliveryTime}
                      </div>
                      <button
                        className="fav-btn active"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(r.id); }}
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                    <div className="restaurant-card-body">
                      <h3>{r.name}</h3>
                      <div className="cuisine">{r.cuisine}</div>
                      <div className="card-meta">
                        <div className="card-rating">
                          <Star size={14} className="star" fill="currentColor" />
                          {r.rating}
                        </div>
                        <div className="card-price">{r.priceRange}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
