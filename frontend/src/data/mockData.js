// Mock Data for Retail Banking BI Dashboard

export const executiveKPIs = {
  totalDeposits: { value: 12.8, unit: 'B', change: 5.2, trend: 'up', label: 'Total Deposits' },
  totalLoans: { value: 8.4, unit: 'B', change: 3.8, trend: 'up', label: 'Loans Outstanding' },
  feeIncome: { value: 124, unit: 'M', change: -1.2, trend: 'down', label: 'Fee-Based Income' },
  newCustomers: { value: 28420, unit: '', change: 12.4, trend: 'up', label: 'New Customers' },
  digitalUsers: { value: 892000, unit: '', change: 18.7, trend: 'up', label: 'Active Digital Users' },
  delinquencyRatio: { value: 2.3, unit: '%', change: 0.4, trend: 'up', label: 'Delinquency Ratio' }
};

export const depositTrendData = [
  { month: 'Jul', deposits: 11.2, casa: 7.8, td: 3.4 },
  { month: 'Aug', deposits: 11.5, casa: 8.0, td: 3.5 },
  { month: 'Sep', deposits: 11.8, casa: 8.2, td: 3.6 },
  { month: 'Oct', deposits: 12.1, casa: 8.4, td: 3.7 },
  { month: 'Nov', deposits: 12.4, casa: 8.6, td: 3.8 },
  { month: 'Dec', deposits: 12.8, casa: 8.9, td: 3.9 }
];

export const loanTrendData = [
  { month: 'Jul', disbursement: 680, outstanding: 7.8 },
  { month: 'Aug', disbursement: 720, outstanding: 7.9 },
  { month: 'Sep', disbursement: 695, outstanding: 8.0 },
  { month: 'Oct', disbursement: 780, outstanding: 8.1 },
  { month: 'Nov', disbursement: 820, outstanding: 8.3 },
  { month: 'Dec', disbursement: 845, outstanding: 8.4 }
];

export const revenueByProduct = [
  { name: 'Savings', value: 35, fill: '#3B82F6' },
  { name: 'Current', value: 20, fill: '#06B6D4' },
  { name: 'Time Deposits', value: 15, fill: '#6366F1' },
  { name: 'Personal Loans', value: 18, fill: '#10B981' },
  { name: 'Cards', value: 12, fill: '#8B5CF6' }
];

export const regionPerformance = [
  { region: 'North', deposits: 3.2, loans: 2.1, customers: 245000, growth: 8.2 },
  { region: 'South', deposits: 2.8, loans: 1.9, customers: 198000, growth: 6.5 },
  { region: 'East', deposits: 2.4, loans: 1.6, customers: 167000, growth: 9.1 },
  { region: 'West', deposits: 2.1, loans: 1.4, customers: 142000, growth: 4.8 },
  { region: 'Central', deposits: 2.3, loans: 1.4, customers: 140000, growth: 7.2 }
];

export const alerts = [
  { id: 1, type: 'warning', title: 'Delinquency Spike', message: 'East region showing 15% increase in 30+ DPD', time: '2h ago' },
  { id: 2, type: 'danger', title: 'Digital Activity Drop', message: 'Mobile app transactions down 12% this week', time: '4h ago' },
  { id: 3, type: 'info', title: 'Branch Performance', message: 'Downtown branch exceeded Q4 targets by 23%', time: '6h ago' },
  { id: 4, type: 'warning', title: 'Cost of Funds', message: 'TD rates increasing, impacting margins', time: '1d ago' }
];

// Deposit & CASA Dashboard Data
export const depositKPIs = {
  casaBalance: { value: 8.9, unit: 'B', change: 4.8, trend: 'up', label: 'CASA Balance' },
  tdBalance: { value: 3.9, unit: 'B', change: 6.2, trend: 'up', label: 'Time Deposits' },
  newAccounts: { value: 15420, unit: '', change: 8.3, trend: 'up', label: 'New Accounts' },
  dormantAccounts: { value: 42150, unit: '', change: -2.1, trend: 'down', label: 'Dormant Accounts' },
  avgBalance: { value: 24500, unit: '', change: 3.2, trend: 'up', label: 'Avg Balance' },
  costOfFunds: { value: 4.2, unit: '%', change: 0.3, trend: 'up', label: 'Cost of Funds' }
};

export const casaTrendData = [
  { month: 'Jan', savings: 5.2, current: 2.4 },
  { month: 'Feb', savings: 5.4, current: 2.5 },
  { month: 'Mar', savings: 5.6, current: 2.5 },
  { month: 'Apr', savings: 5.9, current: 2.6 },
  { month: 'May', savings: 6.2, current: 2.7 },
  { month: 'Jun', savings: 6.5, current: 2.8 }
];

export const depositMixData = [
  { name: 'Savings', value: 45, fill: '#3B82F6' },
  { name: 'Current', value: 25, fill: '#06B6D4' },
  { name: 'Fixed Deposits', value: 20, fill: '#6366F1' },
  { name: 'Recurring', value: 10, fill: '#10B981' }
];

export const branchDepositPerformance = [
  { branch: 'Downtown Main', deposits: 890, growth: 12.4, accounts: 8420 },
  { branch: 'Financial District', deposits: 756, growth: 8.7, accounts: 6890 },
  { branch: 'Tech Park', deposits: 645, growth: 15.2, accounts: 5670 },
  { branch: 'Suburban Central', deposits: 534, growth: 6.3, accounts: 4890 },
  { branch: 'Airport Road', deposits: 478, growth: 9.1, accounts: 4120 }
];

// Lending Dashboard Data
export const lendingKPIs = {
  disbursement: { value: 845, unit: 'M', change: 8.2, trend: 'up', label: 'Loan Disbursement' },
  outstanding: { value: 8.4, unit: 'B', change: 3.8, trend: 'up', label: 'Outstanding Balance' },
  approvalRate: { value: 68, unit: '%', change: 2.1, trend: 'up', label: 'Approval Rate' },
  avgTicket: { value: 125000, unit: '', change: 5.4, trend: 'up', label: 'Avg Ticket Size' },
  parNpl: { value: 2.3, unit: '%', change: 0.4, trend: 'up', label: 'PAR/NPL' },
  recoveryRate: { value: 78, unit: '%', change: 3.2, trend: 'up', label: 'Recovery Rate' }
};

export const disbursementTrend = [
  { month: 'Jul', personal: 280, home: 250, auto: 150 },
  { month: 'Aug', personal: 295, home: 270, auto: 155 },
  { month: 'Sep', personal: 285, home: 260, auto: 150 },
  { month: 'Oct', personal: 310, home: 290, auto: 180 },
  { month: 'Nov', personal: 330, home: 300, auto: 190 },
  { month: 'Dec', personal: 345, home: 310, auto: 190 }
];

export const delinquencyBuckets = [
  { bucket: 'Current', value: 7890, fill: '#10B981' },
  { bucket: '1-30 DPD', value: 320, fill: '#F59E0B' },
  { bucket: '31-60 DPD', value: 120, fill: '#F97316' },
  { bucket: '61-90 DPD', value: 45, fill: '#EF4444' },
  { bucket: '90+ DPD', value: 25, fill: '#DC2626' }
];

export const loanPortfolio = [
  { product: 'Personal Loans', amount: 3.2, npl: 2.8, growth: 12.4 },
  { product: 'Home Loans', amount: 2.8, npl: 1.2, growth: 8.5 },
  { product: 'Auto Loans', amount: 1.4, npl: 1.9, growth: 6.8 },
  { product: 'Education', amount: 0.6, npl: 3.4, growth: 15.2 },
  { product: 'Business', amount: 0.4, npl: 4.1, growth: 4.2 }
];

export const riskHighlights = [
  { indicator: 'Early Warning Accounts', value: 2450, status: 'warning', change: '+8%' },
  { indicator: 'Migration to 30+ DPD', value: 180, status: 'danger', change: '+15%' },
  { indicator: 'High-Risk Concentration', value: 'East Region', status: 'warning', change: '32%' },
  { indicator: 'Restructured Accounts', value: 890, status: 'info', change: '-5%' }
];

// Customer 360 Dashboard Data
export const customerKPIs = {
  totalCustomers: { value: 892000, unit: '', change: 6.8, trend: 'up', label: 'Total Customers' },
  newToBank: { value: 28420, unit: '', change: 12.4, trend: 'up', label: 'New-to-Bank' },
  activeCustomers: { value: 678000, unit: '', change: 4.2, trend: 'up', label: 'Active Customers' },
  dormantCustomers: { value: 142000, unit: '', change: -2.8, trend: 'down', label: 'Dormant Customers' },
  crossSellRatio: { value: 2.4, unit: '', change: 0.3, trend: 'up', label: 'Cross-sell Ratio' },
  churnRisk: { value: 18500, unit: '', change: 5.2, trend: 'up', label: 'Churn Risk Count' }
};

export const customerSegmentation = [
  { segment: 'Premium', value: 12, count: 107040, fill: '#8B5CF6' },
  { segment: 'High Value', value: 23, count: 205160, fill: '#3B82F6' },
  { segment: 'Mid Tier', value: 35, count: 312200, fill: '#06B6D4' },
  { segment: 'Mass', value: 30, count: 267600, fill: '#10B981' }
];

export const productHolding = [
  { segment: 'Premium', savings: 98, current: 85, cards: 92, loans: 78, insurance: 65 },
  { segment: 'High Value', savings: 95, current: 62, cards: 75, loans: 45, insurance: 38 },
  { segment: 'Mid Tier', savings: 88, current: 35, cards: 48, loans: 28, insurance: 15 },
  { segment: 'Mass', savings: 100, current: 12, cards: 22, loans: 15, insurance: 8 }
];

export const churnTrend = [
  { month: 'Jul', atRisk: 15200, churned: 2100 },
  { month: 'Aug', atRisk: 16100, churned: 2300 },
  { month: 'Sep', atRisk: 16800, churned: 2150 },
  { month: 'Oct', atRisk: 17500, churned: 2400 },
  { month: 'Nov', atRisk: 18100, churned: 2280 },
  { month: 'Dec', atRisk: 18500, churned: 2450 }
];

export const customerInsights = [
  { type: 'opportunity', title: 'High-Value Low Product', count: 8420, description: 'Premium customers with <3 products' },
  { type: 'risk', title: 'Inactive Previously Active', count: 12500, description: 'No transactions in 90 days' },
  { type: 'opportunity', title: 'Digital Champions', count: 45200, description: 'High digital adoption, low cross-sell' },
  { type: 'risk', title: 'Declining Balances', count: 6800, description: '30%+ balance drop in 3 months' }
];

// Branch Performance Dashboard Data
export const branchKPIs = {
  targetAchievement: { value: 94, unit: '%', change: 8.2, trend: 'up', label: 'Target Achievement' },
  newAccounts: { value: 15420, unit: '', change: 12.4, trend: 'up', label: 'New Accounts' },
  loanBookings: { value: 4280, unit: '', change: 6.8, trend: 'up', label: 'Loan Bookings' },
  branchDeposits: { value: 12.8, unit: 'B', change: 5.2, trend: 'up', label: 'Branch Deposits' },
  serviceVolume: { value: 892000, unit: '', change: -3.4, trend: 'down', label: 'Service Volume' },
  complaints: { value: 342, unit: '', change: -12.5, trend: 'down', label: 'Complaints' }
};

export const branchLeaderboard = [
  { rank: 1, branch: 'Downtown Main', achievement: 118, deposits: 890, loans: 245, nps: 78 },
  { rank: 2, branch: 'Financial District', achievement: 112, deposits: 756, loans: 198, nps: 82 },
  { rank: 3, branch: 'Tech Park', achievement: 108, deposits: 645, loans: 178, nps: 75 },
  { rank: 4, branch: 'Airport Road', achievement: 102, deposits: 478, loans: 145, nps: 71 },
  { rank: 5, branch: 'Suburban Central', achievement: 98, deposits: 534, loans: 156, nps: 68 }
];

export const branchTargetVsActual = [
  { month: 'Jul', target: 850, actual: 820 },
  { month: 'Aug', target: 880, actual: 910 },
  { month: 'Sep', target: 900, actual: 875 },
  { month: 'Oct', target: 920, actual: 945 },
  { month: 'Nov', target: 950, actual: 980 },
  { month: 'Dec', target: 1000, actual: 1020 }
];

export const staffProductivity = [
  { name: 'Sarah Chen', accounts: 85, loans: 24, revenue: 125000 },
  { name: 'Michael Ross', accounts: 78, loans: 28, revenue: 142000 },
  { name: 'Emily Davis', accounts: 72, loans: 22, revenue: 118000 },
  { name: 'James Wilson', accounts: 68, loans: 19, revenue: 105000 },
  { name: 'Lisa Park', accounts: 65, loans: 21, revenue: 98000 }
];

// Digital Channel Dashboard Data
export const channelKPIs = {
  mobileUsers: { value: 542000, unit: '', change: 18.7, trend: 'up', label: 'Active Mobile Users' },
  ibUsers: { value: 285000, unit: '', change: 8.4, trend: 'up', label: 'Internet Banking Users' },
  atmTxns: { value: 2.4, unit: 'M', change: -5.2, trend: 'down', label: 'ATM Transactions' },
  digitalValue: { value: 4.8, unit: 'B', change: 24.5, trend: 'up', label: 'Digital Txn Value' },
  failedTxns: { value: 0.8, unit: '%', change: -0.3, trend: 'down', label: 'Failed Txn Ratio' },
  migration: { value: 23, unit: '%', change: 8.5, trend: 'up', label: 'Channel Migration' }
};

export const digitalAdoptionTrend = [
  { month: 'Jul', mobile: 420000, web: 245000, atm: 2.8 },
  { month: 'Aug', mobile: 455000, web: 255000, atm: 2.7 },
  { month: 'Sep', mobile: 478000, web: 265000, atm: 2.6 },
  { month: 'Oct', mobile: 502000, web: 272000, atm: 2.5 },
  { month: 'Nov', mobile: 525000, web: 278000, atm: 2.4 },
  { month: 'Dec', mobile: 542000, web: 285000, atm: 2.4 }
];

export const transactionByChannel = [
  { channel: 'Mobile App', transactions: 8.2, value: 2.8, growth: 24.5 },
  { channel: 'Internet Banking', transactions: 4.5, value: 1.6, growth: 12.3 },
  { channel: 'ATM', transactions: 2.4, value: 0.8, growth: -5.2 },
  { channel: 'Branch', transactions: 1.2, value: 0.4, growth: -12.4 },
  { channel: 'POS', transactions: 3.8, value: 1.2, growth: 18.6 }
];

export const failedTxnTrend = [
  { month: 'Jul', mobile: 1.2, web: 0.8, atm: 0.5 },
  { month: 'Aug', mobile: 1.1, web: 0.7, atm: 0.6 },
  { month: 'Sep', mobile: 1.0, web: 0.9, atm: 0.5 },
  { month: 'Oct', mobile: 0.9, web: 0.7, atm: 0.4 },
  { month: 'Nov', mobile: 0.8, web: 0.6, atm: 0.5 },
  { month: 'Dec', mobile: 0.8, web: 0.6, atm: 0.4 }
];

export const channelAlerts = [
  { id: 1, type: 'danger', title: 'High Failed Transactions', message: 'Mobile UPI showing 2.3% failure rate spike', time: '15m ago' },
  { id: 2, type: 'warning', title: 'ATM Cash Shortage', message: '12 ATMs in East region below threshold', time: '1h ago' },
  { id: 3, type: 'info', title: 'New Feature Adoption', message: 'QR payments up 45% after campaign', time: '3h ago' }
];

// Risk & Collections Dashboard Data
export const riskKPIs = {
  par30: { value: 2.8, unit: '%', change: 0.3, trend: 'up', label: 'PAR 30' },
  par90: { value: 1.2, unit: '%', change: 0.1, trend: 'up', label: 'PAR 90' },
  nplRatio: { value: 0.8, unit: '%', change: 0.05, trend: 'up', label: 'NPL Ratio' },
  recovered: { value: 124, unit: 'M', change: 12.4, trend: 'up', label: 'Recovery Collected' },
  inCollections: { value: 8420, unit: '', change: 5.2, trend: 'up', label: 'In Collections' },
  restructured: { value: 2150, unit: '', change: -8.5, trend: 'down', label: 'Restructured' }
};

export const delinquencyTrend = [
  { month: 'Jul', par30: 2.4, par60: 1.0, par90: 0.6 },
  { month: 'Aug', par30: 2.5, par60: 1.1, par90: 0.7 },
  { month: 'Sep', par30: 2.6, par60: 1.0, par90: 0.8 },
  { month: 'Oct', par30: 2.7, par60: 1.1, par90: 0.9 },
  { month: 'Nov', par30: 2.7, par60: 1.2, par90: 1.0 },
  { month: 'Dec', par30: 2.8, par60: 1.2, par90: 1.2 }
];

export const bucketMigration = [
  { from: 'Current', to1_30: 4.2, to31_60: 0.8, to61_90: 0.2, to90plus: 0.1 },
  { from: '1-30 DPD', toCurrent: 62, to31_60: 28, to61_90: 8, to90plus: 2 },
  { from: '31-60 DPD', toCurrent: 25, to1_30: 35, to61_90: 32, to90plus: 8 },
  { from: '61-90 DPD', toCurrent: 12, to1_30: 18, to31_60: 28, to90plus: 42 }
];

export const recoveryByTeam = [
  { team: 'Team Alpha', collected: 42, target: 45, rate: 78 },
  { team: 'Team Beta', collected: 38, target: 40, rate: 82 },
  { team: 'Team Gamma', collected: 28, target: 35, rate: 72 },
  { team: 'Team Delta', collected: 16, target: 20, rate: 68 }
];

export const productRiskComparison = [
  { product: 'Personal Loans', npl: 2.8, par30: 4.2, provision: 3.5 },
  { product: 'Home Loans', npl: 1.2, par30: 2.1, provision: 1.8 },
  { product: 'Auto Loans', npl: 1.9, par30: 3.2, provision: 2.4 },
  { product: 'Education', npl: 3.4, par30: 5.8, provision: 4.2 },
  { product: 'Business', npl: 4.1, par30: 6.5, provision: 5.0 }
];

// Report Center Data
export const reportCategories = [
  { id: 'executive', name: 'Executive', count: 12, icon: 'BarChart3' },
  { id: 'deposits', name: 'Deposits', count: 18, icon: 'Wallet' },
  { id: 'lending', name: 'Lending', count: 24, icon: 'CreditCard' },
  { id: 'customers', name: 'Customers', count: 15, icon: 'Users' },
  { id: 'branches', name: 'Branches', count: 20, icon: 'Building2' },
  { id: 'channels', name: 'Channels', count: 14, icon: 'Smartphone' },
  { id: 'risk', name: 'Risk', count: 22, icon: 'ShieldAlert' }
];

export const savedReports = [
  { id: 1, name: 'Monthly Executive Summary', category: 'Executive', schedule: 'Monthly', lastRun: '2024-01-15', status: 'success' },
  { id: 2, name: 'CASA Growth Analysis', category: 'Deposits', schedule: 'Weekly', lastRun: '2024-01-20', status: 'success' },
  { id: 3, name: 'Loan Portfolio Risk Report', category: 'Lending', schedule: 'Daily', lastRun: '2024-01-21', status: 'running' },
  { id: 4, name: 'Customer Churn Prediction', category: 'Customers', schedule: 'Weekly', lastRun: '2024-01-18', status: 'success' },
  { id: 5, name: 'Branch Performance Ranking', category: 'Branches', schedule: 'Monthly', lastRun: '2024-01-15', status: 'success' },
  { id: 6, name: 'Digital Adoption Metrics', category: 'Channels', schedule: 'Weekly', lastRun: '2024-01-19', status: 'failed' },
  { id: 7, name: 'Delinquency Bucket Analysis', category: 'Risk', schedule: 'Daily', lastRun: '2024-01-21', status: 'success' }
];

export const recentReports = [
  { id: 1, name: 'Q4 2024 Executive Dashboard', downloadedAt: '2024-01-20 14:30', format: 'PDF' },
  { id: 2, name: 'Branch-wise Deposit Report', downloadedAt: '2024-01-19 09:15', format: 'Excel' },
  { id: 3, name: 'Customer Segment Analysis', downloadedAt: '2024-01-18 16:45', format: 'PDF' }
];
