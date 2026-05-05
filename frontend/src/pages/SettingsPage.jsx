import {
  BrandLogoSection,
  AppearanceSection,
  NotificationsSection,
  SecuritySection,
  DataManagementSection,
  UserManagementSection
} from './settings/SettingsSections';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl" data-testid="settings-page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Administration
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Platform settings and configurations
        </p>
      </div>

      <div className="space-y-6">
        <BrandLogoSection />
        <AppearanceSection />
        <NotificationsSection />
        <SecuritySection />
        <DataManagementSection />
        <UserManagementSection />
      </div>
    </div>
  );
}
