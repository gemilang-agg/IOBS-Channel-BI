import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const { collapsed } = useSidebar();
  const [isKiosk, setIsKiosk] = useState(false);

  useEffect(() => {
    // Detect kiosk mode based on screen size or URL param
    const checkKioskMode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const kioskParam = urlParams.get('kiosk') === 'true';
      const isLargeScreen = window.innerWidth >= 1920;
      setIsKiosk(kioskParam || isLargeScreen);
    };

    checkKioskMode();
    window.addEventListener('resize', checkKioskMode);
    return () => window.removeEventListener('resize', checkKioskMode);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div 
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 ${isKiosk ? 'kiosk-mode' : ''}`} 
      data-testid="dashboard-layout"
    >
      <Sidebar />
      <div 
        className={cn(
          "transition-all duration-300",
          collapsed 
            ? "pl-16 kiosk-sm:pl-20 kiosk:pl-24" 
            : "pl-64 kiosk-sm:pl-72 kiosk:pl-80"
        )}
      >
        <Topbar />
        <main className="p-6 kiosk-sm:p-8 kiosk:p-10 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
