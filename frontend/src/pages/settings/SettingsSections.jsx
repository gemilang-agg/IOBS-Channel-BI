import { useRef, useState } from 'react';
import { Bell, Shield, Palette, Database, Users, Upload, X, ImageIcon, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { useTheme } from '../../context/ThemeContext';
import { useLogo } from '../../context/LogoContext';
import { databaseSchema, dataSourcesCatalog, downloadJsonFile } from './exportData';

const HITACHI_LOGO_URL = "https://customer-assets.emergentagent.com/job_deposit-lens/artifacts/x4wihjrc_hitachi-black.png";

function SectionCard({ icon: Icon, iconBg, iconColor, title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, checked, onCheckedChange, defaultChecked, testId, withBorder = true }) {
  return (
    <div className={`flex items-center justify-between py-3 ${withBorder ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
      <div>
        <Label className="text-slate-900 dark:text-white">{label}</Label>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        defaultChecked={defaultChecked}
        data-testid={testId}
      />
    </div>
  );
}

function ActionRow({ label, description, actionLabel, testId, withBorder = true }) {
  return (
    <div className={`flex items-center justify-between py-3 ${withBorder ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
      <div>
        <Label className="text-slate-900 dark:text-white">{label}</Label>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <Button variant="outline" size="sm" data-testid={testId}>{actionLabel}</Button>
    </div>
  );
}

export function BrandLogoSection() {
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
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <SectionCard
      icon={ImageIcon}
      iconBg="bg-indigo-50 dark:bg-indigo-500/10"
      iconColor="text-indigo-500"
      title="Brand Logo"
      subtitle="Upload your organization's logo"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-40 h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
            <img
              src={customLogo || HITACHI_LOGO_URL}
              alt={customLogo ? "Custom Logo" : "Hitachi Logo"}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Upload a logo image (PNG, JPG, SVG). Recommended size: 320x120px (landscape). Max 2MB.
            </p>
            {uploadError && <p className="text-sm text-red-500 mb-2">{uploadError}</p>}
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
    </SectionCard>
  );
}

export function AppearanceSection() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <SectionCard
      icon={Palette}
      iconBg="bg-purple-50 dark:bg-purple-500/10"
      iconColor="text-purple-500"
      title="Appearance"
      subtitle="Customize the look and feel"
    >
      <div className="space-y-4">
        <ToggleRow
          label="Dark Mode"
          description="Toggle dark theme for the dashboard"
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          testId="dark-mode-switch"
        />
        <ToggleRow
          label="Compact Mode"
          description="Reduce spacing for denser layouts"
          testId="compact-mode-switch"
        />
      </div>
    </SectionCard>
  );
}

export function NotificationsSection() {
  return (
    <SectionCard
      icon={Bell}
      iconBg="bg-blue-50 dark:bg-blue-500/10"
      iconColor="text-blue-500"
      title="Notifications"
      subtitle="Manage alert preferences"
    >
      <div className="space-y-4">
        <ToggleRow
          label="Email Alerts"
          description="Receive critical alerts via email"
          defaultChecked
          testId="email-alerts-switch"
        />
        <ToggleRow
          label="Push Notifications"
          description="Browser push notifications"
          defaultChecked
          testId="push-notifications-switch"
        />
        <ToggleRow
          label="Daily Digest"
          description="Summary of key metrics every morning"
          testId="daily-digest-switch"
          withBorder={false}
        />
      </div>
    </SectionCard>
  );
}

export function SecuritySection() {
  return (
    <SectionCard
      icon={Shield}
      iconBg="bg-emerald-50 dark:bg-emerald-500/10"
      iconColor="text-emerald-500"
      title="Security"
      subtitle="Account security settings"
    >
      <div className="space-y-4">
        <ActionRow
          label="Two-Factor Authentication"
          description="Add an extra layer of security"
          actionLabel="Enable"
          testId="enable-2fa-btn"
        />
        <ActionRow
          label="Session Timeout"
          description="Auto logout after 30 minutes of inactivity"
          actionLabel="Configure"
          testId="session-timeout-btn"
        />
        <ActionRow
          label="Active Sessions"
          description="Manage logged-in devices"
          actionLabel="Manage"
          testId="manage-sessions-btn"
          withBorder={false}
        />
      </div>
    </SectionCard>
  );
}

export function DataManagementSection() {
  const handleDownloadSchema = () => downloadJsonFile(databaseSchema, 'channelbi_database_schema.json');
  const handleDownloadDataSources = () => downloadJsonFile(dataSourcesCatalog, 'channelbi_data_sources.json');

  return (
    <SectionCard
      icon={Database}
      iconBg="bg-amber-50 dark:bg-amber-500/10"
      iconColor="text-amber-500"
      title="Data Management"
      subtitle="Data refresh and sync settings"
    >
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
          <Button variant="outline" onClick={handleDownloadSchema} data-testid="download-schema-btn">
            <Download className="w-4 h-4 mr-2" />
            Download Database Schema
          </Button>
          <Button variant="outline" onClick={handleDownloadDataSources} data-testid="download-datasources-btn">
            <Download className="w-4 h-4 mr-2" />
            Download Data Sources
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}

export function UserManagementSection() {
  return (
    <SectionCard
      icon={Users}
      iconBg="bg-cyan-50 dark:bg-cyan-500/10"
      iconColor="text-cyan-500"
      title="User Management"
      subtitle="Manage team access and roles"
    >
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
    </SectionCard>
  );
}
