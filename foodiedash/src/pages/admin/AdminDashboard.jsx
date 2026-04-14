import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Users, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import useStore from '../../store/useStore';

const COLORS = ['#ff6b35', '#8b5cf6', '#00d97e', '#3b82f6', '#ec4899', '#f59e0b'];

export default function AdminDashboard() {
  const orders = useStore(s => s.orders);
  const allUsers = useStore(s => s.allUsers);
  const restaurants = useStore(s => s.restaurants);
  const deliveryPartners = useStore(s => s.deliveryPartners);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: 'Total Orders', value: orders.length.toString(), change: '+12%', positive: true, icon: ShoppingBag, iconBg: 'rgba(255,107,53,0.12)', iconColor: '#ff6b35' },
    { label: 'Revenue', value: `₹${totalRevenue.toFixed(0)}`, change: '+8.2%', positive: true, icon: DollarSign, iconBg: 'rgba(0,217,126,0.12)', iconColor: '#00d97e' },
    { label: 'Active Users', value: allUsers.filter(u => u.active).length.toString(), change: '+5%', positive: true, icon: Users, iconBg: 'rgba(139,92,246,0.12)', iconColor: '#8b5cf6' },
    { label: 'Active Partners', value: deliveryPartners.filter(p => p.available).length.toString(), change: '-2', positive: false, icon: Truck, iconBg: 'rgba(59,130,246,0.12)', iconColor: '#3b82f6' },
  ];

  // ── REAL-TIME ANALYTICS CALCULATIONS ───────────────────
  const today = new Date();
  
  const weeklyOrders = Array.from({length: 7}).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const day = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toISOString().slice(0, 10);
    const dayOrders = orders.filter(o => o.date === dateStr);
    return { day, orders: dayOrders.length, revenue: dayOrders.reduce((s, o) => s + o.total, 0) };
  });

  const monthlyRevenue = Array.from({length: 6}).map((_, i) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - (5 - i));
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const ym = d.toISOString().slice(0, 7);
    const mOrders = orders.filter(o => o.date.startsWith(ym));
    return { month, revenue: mOrders.reduce((s, o) => s + o.total, 0) };
  });

  const cuisineSales = {};
  let totalCuisineHits = 0;
  orders.forEach(o => {
    const rest = restaurants.find(r => r.name === o.restaurant);
    if (rest) {
      rest.cuisine.split('•').map(c => c.trim()).forEach(c => {
        cuisineSales[c] = (cuisineSales[c] || 0) + 1;
        totalCuisineHits += 1;
      });
    } else {
      cuisineSales['Mixed'] = (cuisineSales['Mixed'] || 0) + 1;
      totalCuisineHits += 1;
    }
  });

  let topCuisines = Object.entries(cuisineSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name, 
      value: Math.round((count / totalCuisineHits) * 100) || 0
    }));

  if (topCuisines.length === 0) {
    topCuisines = [{ name: 'Awaiting Orders', value: 100 }];
  }
  // ────────────────────────────────────────────────────────

  const customTooltipStyle = {
    backgroundColor: 'rgba(18,18,26,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f0f0f5',
    fontSize: '13px',
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Overview of your business</p>
        </div>
        <span className="badge badge-green">Live</span>
      </div>

      {/* ─── Stats Cards ──────────────────────────── */}
      <div className="grid-stats" style={{ marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-icon" style={{ background: stat.iconBg, color: stat.iconColor }}>
              <stat.icon size={22} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Charts ────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>📊 Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#5e5e7a" fontSize={12} />
              <YAxis stroke="#5e5e7a" fontSize={12} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="orders" fill="#ff6b35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>💰 Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#5e5e7a" fontSize={12} />
              <YAxis stroke="#5e5e7a" fontSize={12} />
              <Tooltip contentStyle={customTooltipStyle} />
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d97e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00d97e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="revenue" stroke="#00d97e" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Pie Chart */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>🍕 Top Cuisines</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={topCuisines}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {topCuisines.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {topCuisines.map((c, i) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length] }} />
                <span style={{ color: 'var(--text-muted)' }}>{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>📦 Recent Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.slice(0, 5).map(order => {
              const statusMap = {
                preparing: { color: '#f59e0b', label: 'Preparing' },
                picked: { color: '#8b5cf6', label: 'Picked' },
                on_the_way: { color: '#3b82f6', label: 'On the way' },
                delivered: { color: '#00d97e', label: 'Delivered' },
              };
              const st = statusMap[order.status] || statusMap.preparing;
              return (
                <div key={order.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{order.id}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{order.restaurant}</div>
                  </div>
                  <span className="badge" style={{ background: `${st.color}20`, color: st.color }}>{st.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-orange)' }}>{order.total.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
