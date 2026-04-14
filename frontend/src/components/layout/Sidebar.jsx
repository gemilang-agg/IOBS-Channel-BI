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
import { cn } from '../../lib/utils';
import { useLogo } from '../../context/LogoContext';
import { useSidebar } from '../../context/SidebarContext';

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
  const { collapsed, toggleSidebar } = useSidebar();
  const { customLogo } = useLogo();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-slate-900 text-white z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-16 kiosk-sm:w-20 kiosk:w-24" : "w-64 kiosk-sm:w-72 kiosk:w-80"
      )}
      data-testid="sidebar"
    >
      {/* Logo - Fixed height */}
      <div className={cn(
        "flex items-center h-16 kiosk-sm:h-20 kiosk:h-24 px-4 border-b border-slate-700/50 flex-shrink-0",
        collapsed ? "justify-center" : "gap-3"
      )}>
        {customLogo ? (
          <img 
            src={customLogo} 
            alt="Logo" 
            className={cn(
              "rounded-lg object-cover flex-shrink-0",
              collapsed 
                ? "w-10 h-6 kiosk-sm:w-12 kiosk-sm:h-7 kiosk:w-14 kiosk:h-8" 
                : "w-24 h-10 kiosk-sm:w-28 kiosk-sm:h-12 kiosk:w-32 kiosk:h-14"
            )}
          />
        ) : (
          <div className={cn(
            "rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0",
            collapsed 
              ? "w-10 h-6 kiosk-sm:w-12 kiosk-sm:h-7 kiosk:w-14 kiosk:h-8" 
              : "w-24 h-10 kiosk-sm:w-28 kiosk-sm:h-12 kiosk:w-32 kiosk:h-14"
          )}>
            <Landmark className="w-5 h-5 kiosk-sm:w-6 kiosk-sm:h-6 kiosk:w-7 kiosk:h-7 text-white" />
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-heading font-bold text-lg kiosk-sm:text-xl kiosk:text-2xl text-white tracking-tight">Channel BI</h1>
            <p className="text-[10px] kiosk-sm:text-xs kiosk:text-sm text-slate-400 uppercase tracking-wider">Intelligence Platform</p>
          </div>
        )}
      </div>

      {/* Navigation - Fills remaining space */}
      <nav className="flex-1 py-4 overflow-y-auto min-h-0">
        <ul className="space-y-1 px-2 h-full flex flex-col">
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
          {/* Spacer to push admin to bottom */}
          <li className="flex-1" aria-hidden="true"></li>
          {/* Admin link at bottom of nav */}
          <li className="mt-auto border-t border-slate-700/50 pt-2">
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
          </li>
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        data-testid="sidebar-toggle"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
