import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function Restaurants() {
  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const searchQuery = useStore(s => s.searchQuery);
  const setSearchQuery = useStore(s => s.setSearchQuery);
  const getFilteredRestaurants = useStore(s => s.getFilteredRestaurants);
  const toggleFavorite = useStore(s => s.toggleFavorite);
  const favorites = useStore(s => s.favorites);

  const filtered = getFilteredRestaurants({
    priceRange: priceFilter || undefined,
    minRating: ratingFilter ? parseFloat(ratingFilter) : undefined,
    sortBy: sortBy || undefined,
  });

  const priceOptions = ['₹', '₹', '₹₹', '₹₹'];

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title" style={{ fontSize: 36 }}>
            🍽️ All <span>Restaurants</span>
          </h1>

          {/* ─── Search & Filters ──────────────────────── */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input-field"
                style={{ paddingLeft: 40 }}
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                id="restaurant-search"
              />
            </div>
            <select className="select-field" style={{ width: 140 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="">Sort by</option>
              <option value="rating">Top Rated</option>
              <option value="name">A-Z</option>
            </select>
          </div>

          {/* ─── Filter Chips ──────────────────────────── */}
          <div className="filters-bar">
            <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
            <button
              className={`filter-chip ${!priceFilter ? 'active' : ''}`}
              onClick={() => setPriceFilter('')}
            >All Prices</button>
            {priceOptions.map(p => (
              <button
                key={p}
                className={`filter-chip ${priceFilter === p ? 'active' : ''}`}
                onClick={() => setPriceFilter(p === priceFilter ? '' : p)}
              >{p}</button>
            ))}
            <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
            <button
              className={`filter-chip ${!ratingFilter ? 'active' : ''}`}
              onClick={() => setRatingFilter('')}
            >Any Rating</button>
            {['4.5', '4.0'].map(r => (
              <button
                key={r}
                className={`filter-chip ${ratingFilter === r ? 'active' : ''}`}
                onClick={() => setRatingFilter(r === ratingFilter ? '' : r)}
              >⭐ {r}+</button>
            ))}
          </div>

          {/* ─── Results ───────────────────────────────── */}
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
            Showing {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍽️</div>
              <h3>No restaurants found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid-restaurants">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  className="restaurant-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/restaurant/${r.id}`)}
                  id={`restaurant${r.id}`}
                >
                  <div className="restaurant-card-img" style={{ overflow: 'hidden' }}>
                    <img src={r.image} alt={r.name} loading="lazy" />
                    <div className="img-overlay" />
                    <div className="delivery-time">
                      <Clock size={12} /> {r.deliveryTime}
                    </div>
                    <button
                      className={`fav-btn ${favorites.includes(r.id) ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(r.id); }}
                    >
                      <Heart size={16} fill={favorites.includes(r.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="restaurant-card-body">
                    <h3>{r.name}</h3>
                    <div className="cuisine">{r.cuisine}</div>
                    <div className="card-meta">
                      <div className="card-rating">
                        <Star size={14} className="star" fill="currentColor" />
                        {r.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({r.reviews})</span>
                      </div>
                      <div className="card-price">{r.priceRange} • {r.deliveryFee} delivery</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
