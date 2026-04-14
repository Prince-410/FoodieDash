import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🔥 Foodie<span style={{ color: 'var(--accent-orange)' }}>Dash</span></h3>
            <p>Premium food delivery at your fingertips. Discover the best restaurants, get fast delivery from top-rated partners, and enjoy every bite.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/press">Press</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} FoodieDash. All rights reserved. Made with ❤️
        </div>
      </div>
    </footer>
  );
}
