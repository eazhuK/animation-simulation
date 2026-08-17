/**
 * Realistic content configs consumed by PageTemplate.jsx. One config per
 * `pageType` referenced from themes.js (10 types, 3 themes each) — this
 * keeps the 30 simulations showing genuinely different real-world screens
 * without hand-building 30 bespoke page components.
 */
export const PAGE_CONTENT = {
  'analytics-dashboard': {
    kind: 'Analytics Dashboard',
    navItems: ['Overview', 'Audience', 'Revenue', 'Funnels', 'Reports'],
    title: 'Analytics Overview',
    subtitle: 'Last 30 days performance across all channels',
    stats: [
      { label: 'Sessions', value: '128.4k', delta: '+12.4%', trend: 'up' },
      { label: 'Conversion', value: '4.82%', delta: '+0.6%', trend: 'up' },
      { label: 'Avg. Order', value: '$86.20', delta: '-1.1%', trend: 'down' },
      { label: 'Bounce Rate', value: '31.2%', delta: '-3.4%', trend: 'up' },
    ],
    chart: { label: 'Traffic by day', bars: [38, 52, 44, 66, 58, 74, 61, 80, 70, 88] },
    table: {
      columns: ['Channel', 'Sessions', 'Conversion', 'Status'],
      rows: [
        ['Organic Search', '54,201', '5.1%', 'healthy'],
        ['Paid Social', '21,930', '3.4%', 'watch'],
        ['Email', '18,004', '6.8%', 'healthy'],
        ['Referral', '9,420', '2.1%', 'risk'],
      ],
    },
    formFields: [
      { label: 'Date range', type: 'select', options: ['Last 7 days', 'Last 30 days', 'Last quarter'] },
      { label: 'Channel', type: 'select', options: ['All channels', 'Organic', 'Paid', 'Email'] },
    ],
    activity: null,
    modal: { title: 'Export report', body: 'Generate a shareable PDF snapshot of this dashboard for stakeholders.' },
    toast: { title: 'Report ready', message: 'Your export finished generating.' },
  },

  'crm-customers': {
    kind: 'CRM Customer List',
    navItems: ['Customers', 'Deals', 'Pipeline', 'Activities'],
    title: 'Customers',
    subtitle: '2,148 total accounts across 6 regions',
    stats: [
      { label: 'Active Accounts', value: '1,904', delta: '+3.2%', trend: 'up' },
      { label: 'New this month', value: '86', delta: '+14%', trend: 'up' },
      { label: 'Churn risk', value: '27', delta: '+4', trend: 'down' },
      { label: 'Avg. LTV', value: '$4,120', delta: '+2.8%', trend: 'up' },
    ],
    chart: { label: 'New accounts / week', bars: [12, 18, 15, 22, 19, 27, 24] },
    table: {
      columns: ['Company', 'Owner', 'Stage', 'Status'],
      rows: [
        ['Northwind Traders', 'A. Kaur', 'Negotiation', 'healthy'],
        ['Bluebird Retail', 'M. Ortiz', 'Onboarding', 'healthy'],
        ['Vantage Logistics', 'S. Chen', 'At risk', 'risk'],
        ['Harbor & Co.', 'J. Novak', 'Renewal due', 'watch'],
      ],
    },
    formFields: [
      { label: 'Search customers', type: 'text', placeholder: 'Search by name or owner…' },
      { label: 'Region', type: 'select', options: ['All regions', 'EMEA', 'APAC', 'Americas'] },
    ],
    activity: [
      { title: 'A. Kaur logged a call with Northwind Traders', time: '12m ago' },
      { title: 'Renewal reminder sent to Harbor & Co.', time: '1h ago' },
      { title: 'New account: Bluebird Retail', time: '3h ago' },
    ],
    modal: { title: 'New customer', body: 'Add a new account and assign it to an owner and pipeline stage.' },
    toast: { title: 'Account updated', message: 'Vantage Logistics moved to "At risk".' },
  },

  'project-board': {
    kind: 'Project Management Board',
    navItems: ['Board', 'Timeline', 'Backlog', 'Reports'],
    title: 'Product Launch — Q3',
    subtitle: '18 tasks across 4 workstreams, due Sep 30',
    stats: [
      { label: 'Tasks done', value: '42', delta: '+6 today', trend: 'up' },
      { label: 'In progress', value: '11', delta: '', trend: 'flat' },
      { label: 'Blocked', value: '3', delta: '+1', trend: 'down' },
      { label: 'On track', value: '86%', delta: '+4%', trend: 'up' },
    ],
    chart: { label: 'Velocity / sprint', bars: [20, 28, 24, 34, 30, 40] },
    table: {
      columns: ['Task', 'Assignee', 'Priority', 'Status'],
      rows: [
        ['Landing page copy', 'R. Silva', 'High', 'healthy'],
        ['Payment webhook', 'D. Fontaine', 'High', 'risk'],
        ['Onboarding emails', 'K. Yamada', 'Medium', 'watch'],
        ['Analytics events', 'P. Adeyemi', 'Low', 'healthy'],
      ],
    },
    formFields: [
      { label: 'Filter by assignee', type: 'select', options: ['Everyone', 'R. Silva', 'D. Fontaine', 'K. Yamada'] },
      { label: 'Add task', type: 'text', placeholder: 'Quick-add a task…' },
    ],
    activity: null,
    modal: { title: 'Payment webhook', body: 'Blocked on staging credentials from the payments team — escalated this morning.' },
    toast: { title: 'Task moved', message: '"Onboarding emails" moved to In Review.' },
  },

  'finance-overview': {
    kind: 'Finance Overview',
    navItems: ['Overview', 'Cash Flow', 'Budgets', 'Invoices'],
    title: 'Finance Overview',
    subtitle: 'Fiscal Q2 — closed 4 days ago',
    stats: [
      { label: 'Revenue', value: '$482,900', delta: '+8.1%', trend: 'up' },
      { label: 'Expenses', value: '$311,220', delta: '+2.4%', trend: 'down' },
      { label: 'Net Margin', value: '35.6%', delta: '+1.9%', trend: 'up' },
      { label: 'Runway', value: '14 mo', delta: '-1 mo', trend: 'down' },
    ],
    chart: { label: 'Revenue vs. expenses', bars: [40, 55, 48, 62, 58, 70, 66, 76] },
    table: {
      columns: ['Account', 'Category', 'Amount', 'Status'],
      rows: [
        ['Cloud Infrastructure', 'Opex', '$18,240', 'watch'],
        ['Enterprise Contracts', 'Revenue', '$96,500', 'healthy'],
        ['Payroll', 'Opex', '$142,000', 'healthy'],
        ['Ad Spend', 'Marketing', '$22,410', 'risk'],
      ],
    },
    formFields: [
      { label: 'Fiscal period', type: 'select', options: ['Q1', 'Q2', 'Q3', 'Q4'] },
      { label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP'] },
    ],
    activity: null,
    modal: { title: 'Reconcile accounts', body: 'Three accounts have unreconciled transactions from the last statement cycle.' },
    toast: { title: 'Export queued', message: 'Q2 statement export will be ready shortly.' },
  },

  'ecommerce-orders': {
    kind: 'E-commerce Orders',
    navItems: ['Orders', 'Products', 'Customers', 'Discounts'],
    title: 'Orders',
    subtitle: '412 orders in the last 7 days',
    stats: [
      { label: 'Orders', value: '412', delta: '+9.3%', trend: 'up' },
      { label: 'Fulfilled', value: '378', delta: '+11%', trend: 'up' },
      { label: 'Returns', value: '14', delta: '-2', trend: 'up' },
      { label: 'AOV', value: '$72.40', delta: '+3.1%', trend: 'up' },
    ],
    chart: { label: 'Orders / day', bars: [44, 38, 52, 60, 48, 66, 70] },
    table: {
      columns: ['Order', 'Customer', 'Total', 'Status'],
      rows: [
        ['#10482', 'L. Bianchi', '$128.00', 'healthy'],
        ['#10483', 'T. Okafor', '$54.50', 'watch'],
        ['#10484', 'M. Dubois', '$212.90', 'healthy'],
        ['#10485', 'H. Park', '$36.00', 'risk'],
      ],
    },
    formFields: [
      { label: 'Search orders', type: 'text', placeholder: 'Order number or customer…' },
      { label: 'Status', type: 'select', options: ['All', 'Fulfilled', 'Pending', 'Returned'] },
    ],
    activity: null,
    modal: { title: 'Order #10485', body: 'Flagged for review — shipping address does not match billing region.' },
    toast: { title: 'Order shipped', message: 'Order #10482 marked as shipped.' },
  },

  'healthcare-dashboard': {
    kind: 'Healthcare Dashboard',
    navItems: ['Patients', 'Schedule', 'Referrals', 'Reports'],
    title: 'Ward Overview',
    subtitle: 'Shift handover — 42 patients under care',
    stats: [
      { label: 'Admitted', value: '42', delta: '+3', trend: 'flat' },
      { label: 'Critical', value: '4', delta: '+1', trend: 'down' },
      { label: 'Discharges today', value: '7', delta: '', trend: 'flat' },
      { label: 'Bed occupancy', value: '88%', delta: '+5%', trend: 'down' },
    ],
    chart: { label: 'Admissions / day', bars: [10, 14, 9, 16, 12, 18, 15] },
    table: {
      columns: ['Patient', 'Room', 'Condition', 'Status'],
      rows: [
        ['J. Mensah', '204B', 'Stable', 'healthy'],
        ['O. Larsson', '211A', 'Observation', 'watch'],
        ['R. Haddad', '198C', 'Critical', 'risk'],
        ['S. Iqbal', '203A', 'Stable', 'healthy'],
      ],
    },
    formFields: [
      { label: 'Filter by ward', type: 'select', options: ['All wards', 'ICU', 'General', 'Paediatric'] },
      { label: 'Search patient', type: 'text', placeholder: 'Patient name or ID…' },
    ],
    activity: null,
    modal: { title: 'R. Haddad — critical', body: 'Vitals flagged by monitoring at 06:42. Attending physician notified.' },
    toast: { title: 'Handover saved', message: 'Shift handover notes saved for the next team.' },
  },

  'hr-portal': {
    kind: 'HR Portal',
    navItems: ['People', 'Time Off', 'Payroll', 'Onboarding'],
    title: 'People Overview',
    subtitle: '312 employees across 5 departments',
    stats: [
      { label: 'Headcount', value: '312', delta: '+8', trend: 'up' },
      { label: 'Open roles', value: '14', delta: '+2', trend: 'flat' },
      { label: 'On leave', value: '9', delta: '', trend: 'flat' },
      { label: 'Attrition', value: '4.1%', delta: '-0.6%', trend: 'up' },
    ],
    chart: { label: 'Hires / month', bars: [6, 9, 7, 11, 8, 13] },
    table: {
      columns: ['Employee', 'Department', 'Role', 'Status'],
      rows: [
        ['E. Nakamura', 'Engineering', 'Senior Eng.', 'healthy'],
        ['C. Osei', 'Design', 'Product Designer', 'healthy'],
        ['V. Petrov', 'Sales', 'Account Exec.', 'watch'],
        ['F. Almeida', 'Support', 'Support Lead', 'healthy'],
      ],
    },
    formFields: [
      { label: 'Department', type: 'select', options: ['All departments', 'Engineering', 'Design', 'Sales', 'Support'] },
      { label: 'Search people', type: 'text', placeholder: 'Search by name…' },
    ],
    activity: [
      { title: 'V. Petrov requested time off — Sep 2–6', time: '20m ago' },
      { title: 'Offer accepted: new Support Lead', time: '2h ago' },
      { title: 'Payroll run scheduled for Aug 30', time: '5h ago' },
    ],
    modal: { title: 'Approve time off', body: 'V. Petrov requested 5 days off from Sep 2–6. Team coverage confirmed.' },
    toast: { title: 'Request approved', message: 'Time off approved for V. Petrov.' },
  },

  'support-tickets': {
    kind: 'Support Ticket Dashboard',
    navItems: ['Tickets', 'Queues', 'Customers', 'Macros'],
    title: 'Support Queue',
    subtitle: '38 open tickets, 6 escalated',
    stats: [
      { label: 'Open tickets', value: '38', delta: '+5', trend: 'down' },
      { label: 'Avg. response', value: '18m', delta: '-3m', trend: 'up' },
      { label: 'Escalated', value: '6', delta: '+2', trend: 'down' },
      { label: 'CSAT', value: '94%', delta: '+1%', trend: 'up' },
    ],
    chart: { label: 'Tickets / day', bars: [24, 30, 22, 34, 28, 36, 25] },
    table: {
      columns: ['Ticket', 'Customer', 'Priority', 'Status'],
      rows: [
        ['#5821 — Login failing', 'Bluebird Retail', 'High', 'risk'],
        ['#5822 — Billing question', 'Harbor & Co.', 'Low', 'healthy'],
        ['#5823 — Export bug', 'Northwind Traders', 'Medium', 'watch'],
        ['#5824 — Feature request', 'Vantage Logistics', 'Low', 'healthy'],
      ],
    },
    formFields: [
      { label: 'Queue', type: 'select', options: ['All queues', 'Billing', 'Technical', 'Onboarding'] },
      { label: 'Search tickets', type: 'text', placeholder: 'Search by ticket or customer…' },
    ],
    activity: null,
    modal: { title: 'Escalate ticket #5821', body: 'Customer reports repeated login failures since this morning’s deploy.' },
    toast: { title: 'Ticket escalated', message: '#5821 escalated to the platform team.' },
  },

  'invoice-dashboard': {
    kind: 'Invoice Dashboard',
    navItems: ['Invoices', 'Clients', 'Templates', 'Payments'],
    title: 'Invoices',
    subtitle: '$96,420 outstanding across 24 invoices',
    stats: [
      { label: 'Outstanding', value: '$96,420', delta: '+4.2%', trend: 'down' },
      { label: 'Paid this month', value: '$142,900', delta: '+7.8%', trend: 'up' },
      { label: 'Overdue', value: '5', delta: '+2', trend: 'down' },
      { label: 'Avg. days to pay', value: '11.4', delta: '-1.2', trend: 'up' },
    ],
    chart: { label: 'Invoiced / month', bars: [30, 42, 36, 50, 46, 58] },
    table: {
      columns: ['Invoice', 'Client', 'Amount', 'Status'],
      rows: [
        ['INV-2291', 'Northwind Traders', '$8,200', 'healthy'],
        ['INV-2292', 'Harbor & Co.', '$3,450', 'watch'],
        ['INV-2293', 'Vantage Logistics', '$12,600', 'risk'],
        ['INV-2294', 'Bluebird Retail', '$5,980', 'healthy'],
      ],
    },
    formFields: [
      { label: 'Client', type: 'select', options: ['All clients', 'Northwind Traders', 'Harbor & Co.', 'Vantage Logistics'] },
      { label: 'Status', type: 'select', options: ['All', 'Paid', 'Outstanding', 'Overdue'] },
    ],
    activity: null,
    modal: { title: 'Send reminder', body: 'INV-2293 is 9 days overdue. Send a payment reminder to Vantage Logistics?' },
    toast: { title: 'Reminder sent', message: 'Payment reminder sent for INV-2293.' },
  },

  'booking-calendar': {
    kind: 'Booking Calendar',
    navItems: ['Calendar', 'Bookings', 'Resources', 'Availability'],
    title: 'Booking Calendar',
    subtitle: '21 bookings this week across 4 rooms',
    stats: [
      { label: 'Bookings today', value: '9', delta: '+2', trend: 'up' },
      { label: 'Utilisation', value: '76%', delta: '+6%', trend: 'up' },
      { label: 'Cancellations', value: '2', delta: '', trend: 'flat' },
      { label: 'No-shows', value: '1', delta: '-1', trend: 'up' },
    ],
    chart: { label: 'Bookings / day', bars: [5, 8, 6, 9, 7, 4, 3] },
    table: {
      columns: ['Booking', 'Room', 'Time', 'Status'],
      rows: [
        ['Client onboarding call', 'Studio A', '09:30', 'healthy'],
        ['Design review', 'Studio B', '11:00', 'watch'],
        ['Quarterly planning', 'Boardroom', '13:00', 'healthy'],
        ['Vendor demo', 'Studio A', '15:30', 'risk'],
      ],
    },
    formFields: [
      { label: 'Room', type: 'select', options: ['All rooms', 'Studio A', 'Studio B', 'Boardroom'] },
      { label: 'Date', type: 'text', placeholder: 'Aug 15, 2026' },
    ],
    activity: null,
    modal: { title: 'Vendor demo — conflict', body: 'Studio A is double-booked at 15:30. Reassign to Studio B?' },
    toast: { title: 'Booking confirmed', message: 'Quarterly planning confirmed in Boardroom.' },
  },
}
