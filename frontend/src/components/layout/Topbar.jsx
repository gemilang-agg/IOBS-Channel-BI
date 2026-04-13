import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Download,
  ChevronDown,
  LogOut,
  User,
  Calendar
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function Topbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notifications] = useState(3);

  const handleExportPDF = () => {
    // Mock export functionality
    alert('Export to PDF initiated. In production, this would generate a report.');
  };

  return (
    <header 
      className="sticky top-0 z-30 h-16 kiosk-sm:h-20 kiosk:h-24 border-b border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 glass"
      data-testid="topbar"
    >
      <div className="flex items-center justify-between h-full px-6 kiosk-sm:px-8 kiosk:px-10">
        {/* Left Section - Search & Filters */}
        <div className="flex items-center gap-4 kiosk-sm:gap-5 kiosk:gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 kiosk-sm:w-5 kiosk-sm:h-5 text-slate-400" />
            <Input
              type="search"
              placeholder="Search dashboards, reports..."
              className="w-72 kiosk-sm:w-80 kiosk:w-96 pl-10 kiosk-sm:pl-12 kiosk-sm:h-12 kiosk:h-14 kiosk-sm:text-base kiosk:text-lg bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-blue-500"
              data-testid="global-search"
            />
          </div>

          {/* Region Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-slate-100 dark:bg-slate-800 border-0" data-testid="region-filter">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
              <SelectItem value="central">Central</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <Button variant="outline" className="gap-2 bg-slate-100 dark:bg-slate-800 border-0" data-testid="date-filter">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Jan 2024</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Export Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleExportPDF}
            data-testid="export-pdf-btn"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-slate-600 dark:text-slate-400"
            data-testid="theme-toggle"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-slate-600 dark:text-slate-400"
                data-testid="notifications-btn"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 border-2 border-white dark:border-slate-900"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 border-b">
                <p className="font-semibold text-sm">Notifications</p>
              </div>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">Delinquency Alert</span>
                <span className="text-xs text-slate-500">East region showing spike in 30+ DPD</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">Report Ready</span>
                <span className="text-xs text-slate-500">Monthly executive summary is ready</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">Target Achieved</span>
                <span className="text-xs text-slate-500">Downtown branch exceeded Q4 targets</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-2 pl-2 pr-3"
                data-testid="user-menu-btn"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem data-testid="profile-menu-item">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 dark:text-red-400"
                data-testid="logout-btn"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
