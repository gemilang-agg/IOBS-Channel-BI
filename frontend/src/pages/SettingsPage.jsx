import { useState, useRef } from 'react';
import { Bell, Shield, Palette, Database, Users, Upload, X, ImageIcon, Landmark } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { useTheme } from '../context/ThemeContext';
import { useLogo } from '../context/LogoContext';

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { customLogo, uploadLogo, removeLogo } = useLogo();
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);
    
    try {
      await uploadLogo(file);
    } catch (error) {
      setUploadError(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl" data-testid="settings-page">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Administration
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Platform settings and configurations
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Brand Logo</h2>
              <p className="text-sm text-slate-500">Upload your organization's logo</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            {/* Logo Preview */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
                {customLogo ? (
                  <img src={customLogo} alt="Custom Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Landmark className="w-7 h-7 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  Upload a logo image (PNG, JPG, SVG). Recommended size: 200x200px. Max 2MB.
                </p>
                {uploadError && (
                  <p className="text-sm text-red-500 mb-2">{uploadError}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="logo-upload-input"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  data-testid="upload-logo-btn"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Logo'}
                </Button>
                {customLogo && (
                  <Button
                    variant="outline"
                    onClick={removeLogo}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10"
                    data-testid="remove-logo-btn"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Appearance</h2>
              <p className="text-sm text-slate-500">Customize the look and feel</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Dark Mode</Label>
                <p className="text-sm text-slate-500">Toggle dark theme for the dashboard</p>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={toggleTheme}
                data-testid="dark-mode-switch"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Compact Mode</Label>
                <p className="text-sm text-slate-500">Reduce spacing for denser layouts</p>
              </div>
              <Switch data-testid="compact-mode-switch" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Notifications</h2>
              <p className="text-sm text-slate-500">Manage alert preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Email Alerts</Label>
                <p className="text-sm text-slate-500">Receive critical alerts via email</p>
              </div>
              <Switch defaultChecked data-testid="email-alerts-switch" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Push Notifications</Label>
                <p className="text-sm text-slate-500">Browser push notifications</p>
              </div>
              <Switch defaultChecked data-testid="push-notifications-switch" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-slate-900 dark:text-white">Daily Digest</Label>
                <p className="text-sm text-slate-500">Summary of key metrics every morning</p>
              </div>
              <Switch data-testid="daily-digest-switch" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Security</h2>
              <p className="text-sm text-slate-500">Account security settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" data-testid="enable-2fa-btn">Enable</Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Label className="text-slate-900 dark:text-white">Session Timeout</Label>
                <p className="text-sm text-slate-500">Auto logout after 30 minutes of inactivity</p>
              </div>
              <Button variant="outline" size="sm" data-testid="session-timeout-btn">Configure</Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-slate-900 dark:text-white">Active Sessions</Label>
                <p className="text-sm text-slate-500">Manage logged-in devices</p>
              </div>
              <Button variant="outline" size="sm" data-testid="manage-sessions-btn">Manage</Button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Data Management</h2>
              <p className="text-sm text-slate-500">Data refresh and sync settings</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-500 mb-1">Last Data Refresh</p>
              <p className="font-mono font-medium text-slate-900 dark:text-white">2024-01-21 09:45</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-500 mb-1">Refresh Frequency</p>
              <p className="font-mono font-medium text-slate-900 dark:text-white">Every 15 min</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-500 mb-1">Data Sources</p>
              <p className="font-mono font-medium text-slate-900 dark:text-white">12 Connected</p>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-slate-900 dark:text-white">User Management</h2>
              <p className="text-sm text-slate-500">Manage team access and roles</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" data-testid="manage-users-btn">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" data-testid="manage-roles-btn">
              <Shield className="w-4 h-4 mr-2" />
              Manage Roles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
