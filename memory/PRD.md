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
