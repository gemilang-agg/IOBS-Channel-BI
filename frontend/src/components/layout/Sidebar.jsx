import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  Users, 
  Building2, 
  Smartphone, 
  ShieldAlert, 
  FileText,
  Settings,
  Landmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useLogo } from '../../context/LogoContext';

const menuItems = [
  { path: '/dashboard', label: 'Executive', icon: LayoutDashboard },
  { path: '/deposits', label: 'Deposits', icon: Wallet },
  { path: '/lending', label: 'Lending', icon: CreditCard },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/branches', label: 'Branches', icon: Building2 },
  { path: '/channels', label: 'Channels', icon: Smartphone },
  { path: '/risk', label: 'Risk & Collections', icon: ShieldAlert },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { customLogo } = useLogo();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-slate-900 text-white z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-slate-700/50",
        collapsed ? "justify-center" : "gap-3"
      )}>
        {customLogo ? (
          <img 
            src={customLogo} 
            alt="Logo" 
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
            <Landmark className="w-5 h-5 text-white" />
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-heading font-bold text-lg text-white tracking-tight">Channel BI</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Intelligence Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  collapsed && "justify-center px-2",
                  isActive 
                    ? "bg-blue-500/20 text-blue-400" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  "group-hover:text-blue-400"
                )} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Admin Section */}
      <div className="border-t border-slate-700/50 p-2">
        <NavLink
          to="/settings"
          data-testid="nav-settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            collapsed && "justify-center px-2",
            isActive 
              ? "bg-blue-500/20 text-blue-400" 
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium text-sm">Administration</span>}
        </NavLink>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        data-testid="sidebar-toggle"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
