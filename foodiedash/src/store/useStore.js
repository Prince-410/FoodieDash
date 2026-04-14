/* ═══════════════════════════════════════════════════════
   FOODIEDASH — ZUSTAND GLOBAL STORE
   Cart, Orders, Favorites, Notifications, Auth, Admin
   ═══════════════════════════════════════════════════════ */
import { create } from 'zustand';
import { restaurants, menuItems, deliveryPartners, users } from './data';

// ─── Helper: generate IDs ───────────────────────────
const genId = () => Math.random().toString(36).slice(2, 10);

// ─── Main App Store ─────────────────────────────────
const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────
  currentUser: null,
  isLoggedIn: false,
  login: (email, password) => {
    const user = get().allUsers.find(u => u.email === email);
    if (user) {
      set({ currentUser: user, isLoggedIn: true });
      return true;
    }
    return false;
  },
  signup: (name, email, password) => {
    const existing = get().allUsers.find(u => u.email === email);
    if (existing) return false;
    const newUser = { id: 'u' + genId(), name, email, role: 'user', active: true, orders: 0, spent: 0, joined: new Date().toISOString().slice(0, 10) };
    set(s => ({
      allUsers: [...s.allUsers, newUser],
      currentUser: newUser,
      isLoggedIn: true
    }));
    return true;
  },
  logout: () => set({ currentUser: null, isLoggedIn: false }),

  // ── Restaurants ───────────────────────────────────
  restaurants: [...restaurants],
  addRestaurant: (data) => set(s => ({
    restaurants: [...s.restaurants, { ...data, id: 'r' + genId(), rating: 4.5, reviews: 0, isOpen: true }]
  })),
  updateRestaurant: (id, data) => set(s => ({
    restaurants: s.restaurants.map(r => r.id === id ? { ...r, ...data } : r)
  })),
  deleteRestaurant: (id) => set(s => ({
    restaurants: s.restaurants.filter(r => r.id !== id)
  })),

  // ── Menu Items ────────────────────────────────────
  menuItems: [...menuItems],
  addMenuItem: (data) => set(s => ({
    menuItems: [...s.menuItems, { ...data, id: 'm' + genId() }]
  })),
  updateMenuItem: (id, data) => set(s => ({
    menuItems: s.menuItems.map(m => m.id === id ? { ...m, ...data } : m)
  })),
  deleteMenuItem: (id) => set(s => ({
    menuItems: s.menuItems.filter(m => m.id !== id)
  })),

  // ── Cart ──────────────────────────────────────────
  cart: [],
  addToCart: (item, restaurantId, restaurantName) => {
    set(s => {
      const existing = s.cart.find(c => c.id === item.id);
      if (existing) {
        return { cart: s.cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) };
      }
      return { cart: [...s.cart, { ...item, quantity: 1, restaurantId, restaurantName }] };
    });
    get().addNotification('Added to cart', `${item.name} added to your cart`, 'success');
  },
  removeFromCart: (itemId) => set(s => ({
    cart: s.cart.filter(c => c.id !== itemId)
  })),
  updateCartQuantity: (itemId, quantity) => set(s => ({
    cart: quantity <= 0
      ? s.cart.filter(c => c.id !== itemId)
      : s.cart.map(c => c.id === itemId ? { ...c, quantity } : c)
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // ── Coupons ───────────────────────────────────────
  appliedCoupon: null,
  applyCoupon: (code) => {
    const coupons = [
      { code: 'WELCOME20', discount: 20, type: 'percent', minOrder: 300, description: '20% off' },
      { code: 'SAVE50', discount: 50, type: 'flat', minOrder: 400, description: '₹50 off' },
      { code: 'FREEDEL', discount: 100, type: 'delivery', minOrder: 200, description: 'Free delivery' },
    ];
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) {
      get().addNotification('Invalid coupon', 'This coupon code is not valid', 'error');
      return false;
    }
    const total = get().getCartTotal();
    if (total < coupon.minOrder) {
      get().addNotification('Minimum not met', `Minimum order of ₹${coupon.minOrder} required`, 'error');
      return false;
    }
    set({ appliedCoupon: coupon });
    get().addNotification('Coupon applied!', coupon.description, 'success');
    return true;
  },
  removeCoupon: () => set({ appliedCoupon: null }),
  getDiscount: () => {
    const { appliedCoupon } = get();
    if (!appliedCoupon) return 0;
    const total = get().getCartTotal();
    if (appliedCoupon.type === 'percent') return total * (appliedCoupon.discount / 100);
    if (appliedCoupon.type === 'flat') return appliedCoupon.discount;
    return 0;
  },

  // ── Delivery Partners ─────────────────────────────
  deliveryPartners: [...deliveryPartners],
  selectedPartner: null,
  selectPartner: (partnerId) => set({ selectedPartner: partnerId }),
  addDeliveryPartner: (data) => set(s => ({
    deliveryPartners: [...s.deliveryPartners, { ...data, id: 'dp' + genId(), deliveries: 0, rating: 4.5 }]
  })),
  updateDeliveryPartner: (id, data) => set(s => ({
    deliveryPartners: s.deliveryPartners.map(p => p.id === id ? { ...p, ...data } : p)
  })),
  deleteDeliveryPartner: (id) => set(s => ({
    deliveryPartners: s.deliveryPartners.filter(p => p.id !== id)
  })),
  togglePartnerAvailability: (id) => set(s => ({
    deliveryPartners: s.deliveryPartners.map(p =>
      p.id === id ? { ...p, available: !p.available } : p
    )
  })),

  // ── Favorites ─────────────────────────────────────
  favorites: [],
  toggleFavorite: (restaurantId) => set(s => {
    const isFav = s.favorites.includes(restaurantId);
    return { favorites: isFav ? s.favorites.filter(f => f !== restaurantId) : [...s.favorites, restaurantId] };
  }),
  isFavorite: (restaurantId) => get().favorites.includes(restaurantId),

  // ── Orders ────────────────────────────────────────
  orders: [
    {
      id: 'ORD-001',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 14.99 },
        { name: 'Caesar Salad', quantity: 1, price: 10.99 },
      ],
      restaurant: 'Bella Napoli',
      total: 40.97,
      status: 'delivered',
      date: '2024-12-15',
      partnerId: 'dp1',
      partnerName: 'Alex Johnson',
      userId: 'u1',
    },
    {
      id: 'ORD-002',
      items: [
        { name: 'Dragon Roll', quantity: 1, price: 16.99 },
        { name: 'Miso Soup', quantity: 2, price: 4.99 },
      ],
      restaurant: 'Sakura Sushi Bar',
      total: 26.97,
      status: 'on_the_way',
      date: '2024-12-18',
      partnerId: 'dp2',
      partnerName: 'Sarah Chen',
      userId: 'u2',
    },
    {
      id: 'ORD-003',
      items: [
        { name: 'Butter Chicken', quantity: 1, price: 15.99 },
        { name: 'Garlic Naan', quantity: 3, price: 3.99 },
      ],
      restaurant: 'Spice Garden',
      total: 27.96,
      status: 'preparing',
      date: '2024-12-19',
      partnerId: null,
      partnerName: null,
      userId: 'u3',
    },
    {
      id: 'ORD-004',
      items: [
        { name: 'Smash Burger', quantity: 2, price: 14.99 },
        { name: 'Loaded Fries', quantity: 1, price: 9.99 },
      ],
      restaurant: 'The Smokehouse',
      total: 39.97,
      status: 'picked',
      date: '2024-12-19',
      partnerId: 'dp5',
      partnerName: 'Emma Wilson',
      userId: 'u1',
    },
  ],

  placeOrder: (paymentMethod) => {
    const { cart, getCartTotal, getDiscount, selectedPartner, deliveryPartners, currentUser } = get();
    const partner = deliveryPartners.find(p => p.id === selectedPartner);
    const subtotal = getCartTotal();
    const discount = getDiscount();
    const deliveryFee = partner ? partner.price : 40;
    const total = subtotal - discount + deliveryFee;

    const order = {
      id: 'ORD-' + genId().toUpperCase().slice(0, 6),
      items: cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.price })),
      restaurant: cart[0]?.restaurantName || 'Mixed',
      total: Math.round(total),
      status: 'preparing',
      date: new Date().toISOString().slice(0, 10),
      partnerId: selectedPartner,
      partnerName: partner?.name || null,
      userId: currentUser?.id || 'u1',
      paymentMethod,
    };

    set(s => ({
      orders: [order, ...s.orders],
      cart: [],
      appliedCoupon: null,
      selectedPartner: null,
      activeOrderId: order.id,
    }));
    get().addNotification('Order placed!', `Your order ${order.id} is being prepared`, 'success');
    return order.id;
  },

  activeOrderId: null,
  setActiveOrderId: (id) => set({ activeOrderId: id }),

  updateOrderStatus: (orderId, status) => set(s => ({
    orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),

  assignPartnerToOrder: (orderId, partnerId) => {
    const partner = get().deliveryPartners.find(p => p.id === partnerId);
    set(s => ({
      orders: s.orders.map(o => o.id === orderId ? { ...o, partnerId, partnerName: partner?.name || null } : o)
    }));
  },

  // ── Users (Admin) ─────────────────────────────────
  allUsers: [...users],
  toggleUserBlock: (userId) => set(s => ({
    allUsers: s.allUsers.map(u => u.id === userId ? { ...u, active: !u.active } : u)
  })),

  // ── Notifications ─────────────────────────────────
  notifications: [],
  addNotification: (title, message, type = 'info') => {
    const id = genId();
    set(s => ({
      notifications: [...s.notifications, { id, title, message, type, timestamp: Date.now() }]
    }));
    setTimeout(() => {
      set(s => ({ notifications: s.notifications.filter(n => n.id !== id) }));
    }, 4000);
  },
  removeNotification: (id) => set(s => ({
    notifications: s.notifications.filter(n => n.id !== id)
  })),

  // ── Search ────────────────────────────────────────
  messages: [],
  submitMessage: (name, email, subject, message) => set(s => ({
    messages: [{ id: 'msg-' + genId(), name, email, subject, message, date: new Date().toISOString() }, ...s.messages]
  })),
  deleteMessage: (id) => set(s => ({
    messages: s.messages.filter(m => m.id !== id)
  })),
  
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  getFilteredRestaurants: (filters = {}) => {
    const { restaurants: rests, searchQuery } = get();
    let filtered = [...rests];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(r => r.priceRange === filters.priceRange);
    }
    if (filters.minRating) {
      filtered = filtered.filter(r => r.rating >= filters.minRating);
    }
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  },

  // ── Recommendations ───────────────────────────────
  getRecommendations: () => {
    const { restaurants: rests, favorites, orders } = get();
    const orderedRestaurants = new Set(orders.map(o => o.restaurant));
    const scored = rests.map(r => {
      let score = r.rating * 10;
      if (favorites.includes(r.id)) score += 20;
      if (orderedRestaurants.has(r.name)) score += 15;
      if (r.featured) score += 10;
      return { ...r, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 4);
  },
}));

export default useStore;
