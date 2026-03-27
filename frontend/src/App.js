import "@/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
