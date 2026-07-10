import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  ListOrdered,
  Users,
  Tag,
  Warehouse,
  Coins,
  Star,
  FileText,
  Settings,
  Image,
  LogOut,
  ShieldCheck,
  Palette,
  FileClock,
  Home,
  Database,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../app/providers';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { role, logout } = useApp();
  const navigate = useNavigate();

  // Admin tab items
  const adminItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'offline-sales', label: 'Offline Sales', icon: Coins },
    { id: 'customers', label: 'Order Management', icon: Users },
    { id: 'complaints', label: 'Customer Complaints', icon: AlertTriangle },
  ];

  // Superadmin tab items
  const superadminItems = [
    { id: 'enterprise', label: 'Enterprise', icon: ShieldCheck },
    { id: 'revenue', label: 'Revenue Analytics', icon: Coins },
    { id: 'sales-comparison', label: 'Sales Analytics', icon: Database },
    { id: 'admin-mgmt', label: 'Admin Management', icon: Users },
    { id: 'audit-logs', label: 'Audit Logs', icon: FileClock },
    { id: 'theme-builder', label: 'Theme Builder', icon: Palette },
    { id: 'home-mgmt', label: 'Banner & Carousel', icon: Image },
    { id: 'platform-settings', label: 'Platform Settings', icon: Settings },
  ];

  const items = role === 'superadmin' ? superadminItems : adminItems;

  return (
    <div
      style={{
        width: '260px',
        height: '100vh',
        background: 'var(--dark-chocolate)',
        borderRight: '1px solid var(--glass-border)',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        zIndex: 10,
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Brand Header */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            paddingLeft: '8px',
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Chovique Logo"
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--gold)' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548907040-4d42b52115ca?auto=format&fit=crop&w=100&q=80';
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '1.5px',
              background: 'var(--gradient-gold-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CHOVIQUE
          </span>
        </div>

        {/* Navigation Items List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              paddingLeft: '10px',
              marginBottom: '6px',
            }}
          >
            {role} Workspace
          </span>
          <div style={{ maxHeight: '65vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: isActive ? 'var(--dark-chocolate)' : 'var(--beige)',
                    background: isActive ? 'var(--gradient-gold)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                  }}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: '4px',
            fontSize: '0.9rem',
            color: 'var(--cream)',
            background: 'rgba(255, 255, 255, 0.05)',
            textAlign: 'left',
          }}
        >
          <Home size={18} />
          <span>View Site</span>
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: '4px',
            fontSize: '0.9rem',
            color: 'var(--rose-gold)',
            background: 'transparent',
            textAlign: 'left',
            border: '1px solid rgba(183, 110, 121, 0.2)',
          }}
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
