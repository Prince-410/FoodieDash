import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, Heart, ClipboardList, ShoppingCart, User, LogOut, Settings, ChevronDown, Menu, X, Shield } from 'lucide-react';
import useStore from '../store/useStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = useStore(s => s.getCartCount());
  const currentUser = useStore(s => s.currentUser);
  const isLoggedIn = useStore(s => s.isLoggedIn);
  const logout = useStore(s => s.logout);
  const addNotification = useStore(s => s.addNotification);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/restaurants', icon: UtensilsCrossed, label: 'Restaurants' },
    { to: '/orders', icon: ClipboardList, label: 'Orders' },
    { to: '/favorites', icon: Heart, label: 'Favorites' },
    ...(currentUser?.role === 'admin' ? [{ to: '/admin', icon: Shield, label: 'Admin' }] : []),
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">🔥</div>
          Foodie<span className="logo-dot">Dash</span>
        </Link>

        <div className="nav-links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <div className="nav-cart" onClick={() => navigate('/cart')} id="cart-icon">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count" key={cartCount}>{cartCount}</span>}
          </div>

          {isLoggedIn ? (
            <div className="nav-profile" ref={profileRef}>
              <button
                className="nav-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                id="profile-btn"
              >
                <div className="nav-profile-avatar">
                  {currentUser?.name?.charAt(0) || 'G'}
                </div>
                <span>{currentUser?.name?.split(' ')[0] || 'Guest'}</span>
                <ChevronDown size={14} />
              </button>

              <div className={`nav-profile-dropdown ${profileOpen ? 'open' : ''}`}>
                <div className="dropdown-item" onClick={() => navigate('/orders')}>
                  <ClipboardList size={16} />
                  My Orders
                </div>
                <div className="dropdown-item" onClick={() => navigate('/favorites')}>
                  <Heart size={16} />
                  Favorites
                </div>
                {currentUser?.role === 'admin' && (
                  <div className="dropdown-item" onClick={() => navigate('/admin')}>
                    <Settings size={16} />
                    Admin Panel
                  </div>
                )}
                <div className="dropdown-divider" />
                <div className="dropdown-item" onClick={() => {
                  logout();
                  addNotification('Logged out', 'You have been safely signed out.', 'info');
                  navigate('/');
                }}>
                  <LogOut size={16} />
                  Sign Out
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ padding: '8px 16px' }}>Log In</button>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '8px 16px' }}>Sign Up</button>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
