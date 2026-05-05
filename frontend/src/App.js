import "@/index.css";
import { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LogoProvider } from "./context/LogoContext";
import { SidebarProvider } from "./context/SidebarContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import DepositsDashboard from "./pages/DepositsDashboard";
import LendingDashboard from "./pages/LendingDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import BranchDashboard from "./pages/BranchDashboard";
import ChannelDashboard from "./pages/ChannelDashboard";
import RiskDashboard from "./pages/RiskDashboard";
import ReportCenter from "./pages/ReportCenter";
import SettingsPage from "./pages/SettingsPage";

// Remove external badges/watermarks
function useRemoveWatermarks() {
  const removeWatermarks = useCallback(() => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.textContent?.includes('Made with Emergent') || 
          el.innerHTML?.includes('Made with Emergent')) {
        const parent = el.closest('div[style*="position: fixed"]');
        if (parent) {
          parent.style.display = 'none';
          parent.remove();
        } else if (el.style?.position === 'fixed') {
          el.style.display = 'none';
          el.remove();
        }
      }
    });
    
    document.querySelectorAll('body > div').forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('position: fixed') && 
          (style.includes('bottom') || style.includes('right')) &&
          style.includes('z-index')) {
        el.style.display = 'none';
        el.remove();
      }
    });
  }, []);

  useEffect(() => {
    removeWatermarks();
    
    const timeout1 = setTimeout(removeWatermarks, 100);
    const timeout2 = setTimeout(removeWatermarks, 500);
    const timeout3 = setTimeout(removeWatermarks, 1000);
    
    const observer = new MutationObserver(removeWatermarks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      observer.disconnect();
    };
  }, [removeWatermarks]);
}

function App() {
  useRemoveWatermarks();
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <LogoProvider>
          <SidebarProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<ExecutiveDashboard />} />
                  <Route path="/deposits" element={<DepositsDashboard />} />
                  <Route path="/lending" element={<LendingDashboard />} />
                  <Route path="/customers" element={<CustomerDashboard />} />
                  <Route path="/branches" element={<BranchDashboard />} />
                  <Route path="/channels" element={<ChannelDashboard />} />
                  <Route path="/risk" element={<RiskDashboard />} />
                  <Route path="/reports" element={<ReportCenter />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                
                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </LogoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
