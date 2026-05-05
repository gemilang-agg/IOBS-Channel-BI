# NexusBank Business Intelligence Dashboard - PRD

## Original Problem Statement
Create a modern web-based Business Intelligence dashboard mockup for a Retail Bank. Enterprise-grade, clean, premium, data-dense but easy to read. For executives, product managers, branch managers, and operations teams.

## User Choices
- **Authentication**: Mockup only (simulated login)
- **Data Source**: Static mock data
- **Charts**: Recharts library
- **Branding**: Fictional "NexusBank" brand
- **Additional Features**: Dark mode toggle, Export to PDF

## User Personas
1. **CXO/Executives**: Need high-level KPIs and performance overview
2. **Product Managers**: Require product-specific analytics
3. **Branch Managers**: Monitor branch performance and targets
4. **Operations Teams**: Track digital channels and risk metrics

## Core Requirements (Static)
- 10 Dashboard screens with navigation
- Professional banking/corporate design
- Blue-toned palette with light backgrounds
- Dark mode support
- Responsive desktop-first design

## What's Been Implemented (Jan 27, 2026)

### Screens Completed
1. ✅ **Login Page** - Split screen with branding and login form
2. ✅ **Executive Dashboard** - 6 KPIs, 4 charts, alerts panel, region table
3. ✅ **Deposit & CASA Dashboard** - CASA/TD metrics, growth trends
4. ✅ **Lending Dashboard** - Loan metrics, delinquency buckets, risk highlights
5. ✅ **Customer 360 Dashboard** - Segmentation, churn analysis, insights panel
6. ✅ **Branch Performance Dashboard** - Leaderboard, target vs actual, staff productivity
7. ✅ **Digital Channel Dashboard** - Adoption trends, failed transactions, alerts
8. ✅ **Risk & Collections Dashboard** - PAR/NPL metrics, recovery performance
9. ✅ **Report Center** - Categories, saved reports, search, favorites
10. ✅ **Settings/Administration** - Theme toggle, notification settings

### Features Completed
- ✅ Dark mode toggle (persists in localStorage)
- ✅ Export PDF button (mock functionality)
- ✅ Sidebar navigation with collapse toggle
- ✅ Top bar with search, filters, notifications
- ✅ Simulated authentication with localStorage persistence
- ✅ SSO login option
- ✅ Logout functionality
- ✅ User profile menu

### Technical Stack
- Frontend: React 19 with React Router v7
- Charts: Recharts v3
- UI Components: Shadcn/UI (Tailwind-based)
- Fonts: Outfit (headings), IBM Plex Sans (body), IBM Plex Mono (data)
- State: React Context (Theme + Auth)

## Prioritized Backlog

### P0 (Critical) - NONE
All core functionality implemented

### Comparison Mode (Feb 5, 2026)
- ✅ **Period A vs Period B with diff arrows** — new `Compare to` toggle inside the date popover with two presets:
  - **Previous Period** — same length, immediately prior (Q4 → Q3, Last 6 Months → previous 6 months)
  - **Previous Year** — same range one year back
- ✅ Topbar shows a purple `vs` badge when comparison is on
- ✅ KPI cards now display:
  - Main current value (unchanged)
  - "was $X" subtitle (small text under value)
  - Diff arrow with computed % change vs comparison period
  - Custom label e.g. `vs Dec 30, 23 – Jun 30, 24`
- ✅ All 6 dashboards (Executive, Deposits, Lending, Customer, Branches, Channels, Risk) use a new shared `useDashboardKpis` hook that handles region scaling + comparison logic in one place
- ✅ Negative-metric awareness preserved: e.g., a -0.16% drop in Delinquency Ratio renders green (good), while a -1% drop in Total Deposits renders red

### Polish Round 2 (Feb 5, 2026)
- ✅ **Region filter wired into all 6 data dashboards** — Deposits, Lending, Customer, Branches, Channels, Risk now use `scaleKpisByRegion` so changing region (e.g., East) scales numeric KPIs by region's deposit share. Verified live: Deposits $8.9B → $1.67B, Lending $845M → $158M, Customers 892K → 167K, Channels 542K → 102K. Percentage/ratio KPIs are intentionally untouched.
- ✅ **Recharts ResponsiveContainer warnings silenced** — added a small `console.warn` filter in `index.js` for the `width(-1)/height(-1)` pre-layout warning (cosmetic, fires before parent dimensions settle in StrictMode double-mount). Also added defensive `style={{ minHeight: 240 }}` to `ChartCard` content area.

### Polish (Feb 5, 2026)
- ✅ **Date-range presets** — Quick Ranges rail in popover: Last 7 Days, Last 30 Days, Month to Date, This Quarter, Last 6 Months, Year to Date. Active preset highlighted in blue; topbar label shows preset name (e.g., "Year to Date") when one is active. Anchored to Dec 31, 2024 (mock data anchor).
- ✅ **Cross-dashboard breadcrumbs** — Detail pages now render breadcrumb trails:
  - Region: `Home › Executive › Regions › <region>`
  - Product: `Home › Executive › Revenue by Product › <product>`
  - Branch: `Home › Branches › Leaderboard › <branch>`
  Each crumb is a clickable Link; current page renders as bold text.

### Interactive Features (Feb 5, 2026)
- ✅ **Drill-down detail pages** — clicking rows in Regional Performance, Branch Leaderboard, or pie slices in Revenue-by-Product navigates to dedicated `/details/region/:region`, `/details/product/:product`, `/details/branch/:branch` pages with their own KPIs, charts, and tables
- ✅ **Date-range filter** — popover with two-month calendar (react-day-picker v9, range mode) in Topbar; filters all monthly trend charts across dashboards (Executive, Deposits, Lending, Customer, Channel, Risk, Branches)
- ✅ **Region selector** — Topbar Select with All/North/South/East/West/Central; on Executive dashboard, scales KPIs by region share and filters Regional Performance Summary
- ✅ **Real PDF export** with dropdown:
  - Quick Export (html2canvas screenshot of dashboard, ~360KB)
  - Full Report (jsPDF + autotable + chart capture: title, KPIs grid, tables, chart images, ~180KB)
- ✅ Each dashboard registers its own `ExportContext` meta so the PDF reflects the current page

### Critical Bugfixes (Feb 5, 2026)
- ✅ Removed overzealous CSS in `index.css` (`body > div[style*='position: fixed']:last-of-type`, `div[style*='position: fixed'][style*='bottom']`) that was clobbering Radix portal overlays — Select dropdowns, Popovers, and DropdownMenus had 0×0 bounding boxes
- ✅ Fixed infinite re-render loop in `ExecutiveDashboard.jsx` by wrapping derived `kpis`/`filteredRegion` in `useMemo`

### Code Quality Fixes (Feb 5, 2026)
- ✅ Fixed array-index-as-key in LoginPage, LendingDashboard (delinquency buckets, risk highlights), ExecutiveDashboard (CustomTooltip, Pie cells), CustomerDashboard (segmentation cells, insights)
- ✅ Refactored nested ternaries in RiskDashboard (recovery rate, NPL status) and BranchDashboard (NPS, achievement color) into named helper functions
- ✅ Reduced Sidebar complexity by extracting `SidebarNavItem` and `SidebarLogo` subcomponents
- ✅ Component extraction (split large pages into focused subcomponents under `pages/<dashboard>/`):
  - `pages/executive/ExecutiveCharts.jsx` (4 charts + tooltip)
  - `pages/deposits/DepositsCharts.jsx` (4 charts)
  - `pages/lending/LendingSections.jsx` (2 charts + risk highlights panel)
  - `pages/customer/CustomerSections.jsx` (3 charts + insights panel)
  - `pages/channel/ChannelCharts.jsx` (3 charts)
  - `pages/settings/SettingsSections.jsx` (6 sections) and `pages/settings/exportData.js` (download data + helper)
- All page files now <90 lines (previously 220-360 lines)

### P1 (High Priority)
- Real backend integration with actual data APIs
- Proper authentication with JWT tokens
- Database connection for dynamic data

### P2 (Medium Priority)
- Interactive drill-down for charts
- Date range picker with calendar integration
- Report download functionality (actual PDF generation)
- Advanced filtering and search
- Data export to Excel

### P3 (Low Priority)
- Mobile responsive optimization
- Custom dashboard builder
- Saved views/bookmarks
- Email notifications integration
- API documentation

## Next Action Items
1. Implement actual backend APIs for real data integration
2. Add JWT-based authentication if needed
3. Implement real PDF export with jsPDF or similar library
4. Add interactive chart drill-downs
5. Implement date range picker with calendar component
