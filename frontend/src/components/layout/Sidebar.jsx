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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLogo } from '../../context/LogoContext';
import { useSidebar } from '../../context/SidebarContext';
import { SidebarNavItem } from './SidebarNavItem';

const HITACHI_LOGO_URL = "https://customer-assets.emergentagent.com/job_deposit-lens/artifacts/x4wihjrc_hitachi-black.png";

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

const toTestId = (label) => `nav-${label.toLowerCase().replace(/\s+/g, '-')}`;

function SidebarLogo({ collapsed, customLogo }) {
  const logoSrc = customLogo || HITACHI_LOGO_URL;
  const logoSizeClass = collapsed
    ? "w-10 h-6 kiosk-sm:w-12 kiosk-sm:h-7 kiosk:w-14 kiosk:h-8"
    : "w-24 h-10 kiosk-sm:w-28 kiosk-sm:h-12 kiosk:w-32 kiosk:h-14";

  return (
    <div className={cn(
      "flex items-center h-16 kiosk-sm:h-20 kiosk:h-24 px-4 kiosk-sm:px-5 kiosk:px-6 border-b border-slate-700/50 flex-shrink-0 rounded-t-2xl",
      collapsed ? "justify-center" : "gap-3 kiosk-sm:gap-4"
    )}>
      <img
        src={logoSrc}
        alt={customLogo ? "Logo" : "Hitachi Logo"}
        className={cn("rounded-lg object-cover flex-shrink-0", logoSizeClass)}
      />
      {!collapsed && (
        <div className="overflow-hidden">
          <h1 className="font-heading font-bold text-lg kiosk-sm:text-xl kiosk:text-2xl text-white tracking-tight">Channel BI</h1>
          <p className="text-[10px] kiosk-sm:text-xs kiosk:text-sm text-slate-400 uppercase tracking-wider">Intelligence Platform</p>
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const { customLogo } = useLogo();

  return (
    <aside
      className={cn(
        "fixed left-4 top-4 bottom-4 bg-slate-900 text-white z-40 transition-all duration-300 flex flex-col rounded-2xl shadow-2xl",
        collapsed
          ? "w-16 kiosk-sm:w-20 kiosk:w-24"
          : "w-64 kiosk-sm:w-72 kiosk:w-80 2xl:w-80"
      )}
      data-testid="sidebar"
    >
      <SidebarLogo collapsed={collapsed} customLogo={customLogo} />

      {/* Navigation - Fills remaining space */}
      <nav className="flex-1 py-4 kiosk-sm:py-5 kiosk:py-6 overflow-y-auto min-h-0">
        <ul className="space-y-1 kiosk-sm:space-y-2 kiosk:space-y-3 px-2 kiosk-sm:px-3 kiosk:px-4 h-full flex flex-col">
          {menuItems.map((item) => (
            <li key={item.path}>
              <SidebarNavItem
                to={item.path}
                label={item.label}
                icon={item.icon}
                collapsed={collapsed}
                testId={toTestId(item.label)}
              />
            </li>
          ))}
          <li className="flex-1" aria-hidden="true"></li>
          <li className="mt-auto border-t border-slate-700/50 pt-2 kiosk-sm:pt-3 kiosk:pt-4">
            <SidebarNavItem
              to="/settings"
              label="Administration"
              icon={Settings}
              collapsed={collapsed}
              testId="nav-settings"
            />
          </li>
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        data-testid="sidebar-toggle"
        className="absolute -right-3 top-20 kiosk-sm:top-24 kiosk:top-28 w-6 h-6 kiosk-sm:w-7 kiosk-sm:h-7 kiosk:w-8 kiosk:h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
      >
        {collapsed
          ? <ChevronRight className="w-4 h-4 kiosk-sm:w-5 kiosk-sm:h-5" />
          : <ChevronLeft className="w-4 h-4 kiosk-sm:w-5 kiosk-sm:h-5" />}
      </button>
    </aside>
  );
}
