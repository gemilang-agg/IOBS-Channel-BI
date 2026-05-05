import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const baseLinkClasses = "flex items-center gap-3 kiosk-sm:gap-4 px-3 kiosk-sm:px-4 kiosk:px-5 py-2.5 kiosk-sm:py-3.5 kiosk:py-4 rounded-lg kiosk-sm:rounded-xl transition-all duration-200 group";
const iconClasses = "w-5 h-5 kiosk-sm:w-6 kiosk-sm:h-6 kiosk:w-7 kiosk:h-7 flex-shrink-0 transition-colors group-hover:text-blue-400";
const labelClasses = "font-medium text-sm kiosk-sm:text-base kiosk:text-lg";

const getActiveClass = (isActive) => isActive
  ? "bg-blue-500/20 text-blue-400"
  : "text-slate-400 hover:text-white hover:bg-slate-800/60";

export function SidebarNavItem({ to, label, icon: Icon, collapsed, testId }) {
  return (
    <NavLink
      to={to}
      data-testid={testId}
      className={({ isActive }) => cn(
        baseLinkClasses,
        collapsed && "justify-center px-2",
        getActiveClass(isActive)
      )}
    >
      <Icon className={iconClasses} />
      {!collapsed && <span className={labelClasses}>{label}</span>}
    </NavLink>
  );
}
