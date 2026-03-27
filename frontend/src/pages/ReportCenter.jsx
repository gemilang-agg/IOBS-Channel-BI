import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Calendar, 
  Clock,
  FileText,
  BarChart3,
  Wallet,
  CreditCard,
  Users,
  Building2,
  Smartphone,
  ShieldAlert,
  Star,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  reportCategories, 
  savedReports, 
  recentReports 
} from '../data/mockData';
import { cn } from '../lib/utils';

const iconMap = {
  BarChart3: BarChart3,
  Wallet: Wallet,
  CreditCard: CreditCard,
  Users: Users,
  Building2: Building2,
  Smartphone: Smartphone,
  ShieldAlert: ShieldAlert
};

export default function ReportCenter() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = savedReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category.toLowerCase() === selectedCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExport = (reportName) => {
    alert(`Exporting "${reportName}"... In production, this would generate the report.`);
  };

  const handleCreateAnalysis = () => {
    alert('Opening custom analysis builder... In production, this would open a report builder interface.');
  };

  return (
    <div className="space-y-6" data-testid="report-center">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
            Report Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Access reports and create custom analysis
          </p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateAnalysis}
          data-testid="create-analysis-btn"
        >
          <Plus className="w-4 h-4" />
          Create Custom Analysis
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="search"
          placeholder="Search reports by name, category..."
          className="pl-10 h-12 text-base bg-white dark:bg-slate-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="report-search"
        />
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
          Report Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "p-4 rounded-lg border transition-all text-center",
              selectedCategory === 'all'
                ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
            )}
            data-testid="category-all"
          >
            <FileText className={cn(
              "w-6 h-6 mx-auto mb-2",
              selectedCategory === 'all' ? "text-blue-500" : "text-slate-400"
            )} />
            <span className={cn(
              "text-sm font-medium",
              selectedCategory === 'all' ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
            )}>All</span>
            <p className="text-xs text-slate-500 mt-1">{savedReports.length}</p>
          </button>
          
          {reportCategories.map((category) => {
            const Icon = iconMap[category.icon] || FileText;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "p-4 rounded-lg border transition-all text-center",
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                )}
                data-testid={`category-${category.id}`}
              >
                <Icon className={cn(
                  "w-6 h-6 mx-auto mb-2",
                  isSelected ? "text-blue-500" : "text-slate-400"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
                )}>{category.name}</span>
                <p className="text-xs text-slate-500 mt-1">{category.count}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Reports Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white">
              Saved Reports
            </h3>
            <Badge variant="secondary">{filteredReports.length} reports</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Report Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Category</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Schedule</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900 dark:text-white">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{report.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
                        <Clock className="w-3 h-3" />
                        {report.schedule}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={cn(
                        report.status === 'success' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
                        report.status === 'running' && "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
                        report.status === 'failed' && "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                      )}>
                        {report.status === 'success' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {report.status === 'running' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                        {report.status === 'failed' && <XCircle className="w-3 h-3 mr-1" />}
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleExport(report.name)}
                        data-testid={`download-report-${report.id}`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reports & Favorites */}
        <div className="space-y-6">
          {/* Recent Downloads */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              Recent Downloads
            </h3>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div 
                  key={report.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{report.name}</p>
                    <p className="text-xs text-slate-500">{report.downloadedAt}</p>
                  </div>
                  <Badge variant="outline">{report.format}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Favorites
            </h3>
            <div className="space-y-2">
              {savedReports.slice(0, 4).map((report) => (
                <button 
                  key={report.id}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  data-testid={`favorite-report-${report.id}`}
                >
                  <span className="font-medium text-sm text-slate-900 dark:text-white">{report.name}</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
