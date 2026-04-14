import { motion } from 'framer-motion';
import { Shield, ShieldOff, Mail, Calendar } from 'lucide-react';
import useStore from '../../store/useStore';

export default function ManageUsers() {
  const allUsers = useStore(s => s.allUsers);
  const toggleUserBlock = useStore(s => s.toggleUserBlock);
  const addNotification = useStore(s => s.addNotification);

  const handleToggle = (user) => {
    toggleUserBlock(user.id);
    addNotification(
      user.active ? 'User blocked' : 'User unblocked',
      `${user.name} has been ${user.active ? 'blocked' : 'unblocked'}`,
      user.active ? 'error' : 'success'
    );
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Users</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {allUsers.filter(u => u.active).length} active / {allUsers.length} total
          </p>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: user.role === 'admin' ? 'var(--gradient-orange)' : 'var(--gradient-purple)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: 'white',
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                    {user.email}
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-orange' : 'badge-blue'}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.orders}</td>
                <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>${user.spent.toFixed(2)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    {user.joined}
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.active ? 'badge-green' : 'badge-red'}`}>
                    {user.active ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${user.active ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleToggle(user)}
                    style={{ fontSize: 12 }}
                  >
                    {user.active ? <><ShieldOff size={14} /> Block</> : <><Shield size={14} /> Unblock</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
