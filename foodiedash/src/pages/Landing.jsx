import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Star, Clock, TrendingUp, Zap, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { offers } from '../store/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Landing() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const restaurants = useStore(s => s.restaurants);
  const setSearchQuery = useStore(s => s.setSearchQuery);
  const getRecommendations = useStore(s => s.getRecommendations);
  const toggleFavorite = useStore(s => s.toggleFavorite);
  const favorites = useStore(s => s.favorites);

  const featured = restaurants.filter(r => r.featured).slice(0, 4);
  const recommendations = getRecommendations();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    navigate('/restaurants');
  };

  return (
    <div className="page-wrapper">
      {/* ─── Hero Section ─────────────────────────────── */}
      <section className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div className="hero-badge" variants={fadeUp} custom={0}>
              <Zap size={14} /> #1 Food Delivery Platform
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}>
              Delicious food,<br />
              <span className="gradient-text">delivered fast.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}>
              Discover restaurants near you, order from curated menus, and get your favorite meals delivered in minutes by top-rated partners.
            </motion.p>

            <motion.form className="hero-search" onSubmit={handleSearch} variants={fadeUp} custom={3}>
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                id="hero-search-input"
              />
              <button type="submit" className="btn btn-primary btn-lg">
                <Search size={18} /> Search
              </button>
            </motion.form>

            <motion.div className="hero-stats" variants={fadeUp} custom={4}>
              <div className="hero-stat">
                <div className="hero-stat-value">500<span>+</span></div>
                <div className="hero-stat-label">Restaurants</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">15<span>K+</span></div>
                <div className="hero-stat-label">Happy Users</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">98<span>%</span></div>
                <div className="hero-stat-label">On-time Delivery</div>
              </div>
            </motion.div>
          </motion.div>

          <div className="hero-images">
            <motion.div
              className="hero-food-grid"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {featured.slice(0, 4).map((r, i) => (
                <motion.div
                  key={r.id}
                  className="hero-food-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: i % 2 === 1 ? 24 : (i === 2 ? -12 : 0) }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <img src={r.image} alt={r.name} loading="lazy" />
                  <h4>{r.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="price" style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>
                      ⭐ {r.rating}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.deliveryTime}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Offers Section ───────────────────────────── */}
      <section className="container" style={{ marginTop: 60 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          🎉 Today's <span>Offers</span>
        </motion.h2>
        <div className="offers-section">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              className={`offer-card ${offer.color}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="offer-discount">{offer.discount}</div>
              <div className="offer-title">{offer.title}</div>
              <div className="offer-desc">{offer.desc}</div>
              <div className="offer-code">{offer.code}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Featured Restaurants ─────────────────────── */}
      <section className="container" style={{ marginTop: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <motion.h2
            className="section-title"
            style={{ marginBottom: 0 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            🔥 Featured <span>Restaurants</span>
          </motion.h2>
          <Link to="/restaurants" className="btn btn-ghost" style={{ color: 'var(--accent-orange)' }}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid-restaurants">
          {featured.map((r, i) => (
            <motion.div
              key={r.id}
              className="restaurant-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/restaurant/${r.id}`)}
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
                  <div className="card-price">{r.priceRange}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Recommendations ──────────────────────────── */}
      <section className="container" style={{ marginTop: 60 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ✨ Recommended <span>For You</span>
        </motion.h2>

        <div className="grid-restaurants">
          {recommendations.map((r, i) => (
            <motion.div
              key={r.id}
              className="restaurant-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/restaurant/${r.id}`)}
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
                    {r.rating}
                  </div>
                  <div className="card-price">{r.priceRange}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────── */}
      <section className="container" style={{ marginTop: 80 }}>
        <motion.div
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,53,0.12), rgba(139,92,246,0.08))',
            border: '1px solid rgba(255,107,53,0.15)',
            borderRadius: 'var(--radius-xl)',
            padding: '60px 40px',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
            Ready to order?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Browse hundreds of restaurants, find your favorite meal, and get it delivered in minutes.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/restaurants')}>
             Explore Restaurants
          </button>
        </motion.div>
      </section>
    </div>
  );
}
