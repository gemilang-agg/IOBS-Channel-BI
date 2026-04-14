import { useState, useRef } from 'react';
import { Bell, Shield, Palette, Database, Users, Upload, X, ImageIcon, Landmark, Download } from 'lucide-react';
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
              <div className="w-40 h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
                {customLogo ? (
                  <img src={customLogo} alt="Custom Logo" className="w-full h-full object-cover" />
                ) : (
                  <img src="https://customer-assets.emergentagent.com/job_deposit-lens/artifacts/x4wihjrc_hitachi-black.png" alt="Hitachi Logo" className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  Upload a logo image (PNG, JPG, SVG). Recommended size: 320x120px (landscape). Max 2MB.
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Export Options</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  const schema = {
                    version: "1.0.0",
                    generated: new Date().toISOString(),
                    tables: [
                      { name: "deposits", columns: ["id", "account_id", "balance", "type", "branch_id", "created_at"] },
                      { name: "loans", columns: ["id", "customer_id", "amount", "product_type", "status", "disbursement_date"] },
                      { name: "customers", columns: ["id", "name", "segment", "region", "products_held", "created_at"] },
                      { name: "branches", columns: ["id", "name", "region", "manager_id", "target", "actual"] },
                      { name: "transactions", columns: ["id", "account_id", "channel", "amount", "type", "timestamp"] },
                      { name: "collections", columns: ["id", "loan_id", "dpd_bucket", "amount_due", "collector_id", "status"] }
                    ],
                    relationships: [
                      { from: "deposits.account_id", to: "customers.id" },
                      { from: "loans.customer_id", to: "customers.id" },
                      { from: "branches.manager_id", to: "users.id" },
                      { from: "transactions.account_id", to: "deposits.account_id" },
                      { from: "collections.loan_id", to: "loans.id" }
                    ]
                  };
                  const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'channelbi_database_schema.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                data-testid="download-schema-btn"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Database Schema
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const dataSources = {
                    version: "1.0.0",
                    generated: new Date().toISOString(),
                    sources: [
                      { id: 1, name: "Core Banking System", type: "Oracle", status: "Connected", tables: 24, lastSync: "2024-01-21 09:45" },
                      { id: 2, name: "Loan Management System", type: "PostgreSQL", status: "Connected", tables: 18, lastSync: "2024-01-21 09:42" },
                      { id: 3, name: "CRM Database", type: "Salesforce", status: "Connected", tables: 12, lastSync: "2024-01-21 09:30" },
                      { id: 4, name: "Mobile Banking API", type: "REST API", status: "Connected", tables: 8, lastSync: "2024-01-21 09:45" },
                      { id: 5, name: "Internet Banking", type: "MySQL", status: "Connected", tables: 15, lastSync: "2024-01-21 09:40" },
                      { id: 6, name: "ATM Network", type: "SQL Server", status: "Connected", tables: 6, lastSync: "2024-01-21 09:35" },
                      { id: 7, name: "Card Management", type: "Oracle", status: "Connected", tables: 10, lastSync: "2024-01-21 09:38" },
                      { id: 8, name: "Branch Operations", type: "PostgreSQL", status: "Connected", tables: 14, lastSync: "2024-01-21 09:44" },
                      { id: 9, name: "Collections System", type: "MySQL", status: "Connected", tables: 8, lastSync: "2024-01-21 09:41" },
                      { id: 10, name: "Risk Analytics", type: "Snowflake", status: "Connected", tables: 20, lastSync: "2024-01-21 09:43" },
                      { id: 11, name: "Customer Service", type: "Zendesk API", status: "Connected", tables: 5, lastSync: "2024-01-21 09:30" },
                      { id: 12, name: "Regulatory Reporting", type: "Data Warehouse", status: "Connected", tables: 30, lastSync: "2024-01-21 09:00" }
                    ],
                    totalTables: 170,
                    refreshInterval: "15 minutes"
                  };
                  const blob = new Blob([JSON.stringify(dataSources, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'channelbi_data_sources.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                data-testid="download-datasources-btn"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Data Sources
              </Button>
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
