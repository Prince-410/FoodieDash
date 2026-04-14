import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, UtensilsCrossed, Truck, ClipboardList, Users } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import ManageRestaurants from './ManageRestaurants';
import ManageMenu from './ManageMenu';
import ManagePartners from './ManagePartners';
import ManageOrders from './ManageOrders';
import ManageUsers from './ManageUsers';
import ManageMessages from './ManageMessages';
import { Mail } from 'lucide-react';

const adminNavItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/restaurants', icon: Store, label: 'Restaurants' },
  { path: '/admin/menu', icon: UtensilsCrossed, label: 'Menu Items' },
  { path: '/admin/partners', icon: Truck, label: 'Partners' },
  { path: '/admin/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/messages', icon: Mail, label: 'Messages' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Admin Panel</div>
        {adminNavItems.map(item => (
          <div
            key={item.path}
            className={`admin-nav-item ${isActive(item) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}
      </aside>

      <main className="admin-content">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="restaurants" element={<ManageRestaurants />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="partners" element={<ManagePartners />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="messages" element={<ManageMessages />} />
        </Routes>
      </main>
    </div>
  );
}
