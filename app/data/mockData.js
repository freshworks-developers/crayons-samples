export const ACCOUNTS = [
  {
    id: 'acct-1001',
    name: 'Northwind Labs',
    owner: 'Sarah Chen',
    tier: 'Enterprise',
    health: 82,
    nps: 46,
    churnRisk: 'Low',
    mrr: 24800,
    seats: 120,
    renewalDate: '2026-09-15T00:00:00Z',
    region: 'North America'
  },
  {
    id: 'acct-1002',
    name: 'Brightline Health',
    owner: 'Marcus Lee',
    tier: 'Growth',
    health: 58,
    nps: 12,
    churnRisk: 'High',
    mrr: 8900,
    seats: 45,
    renewalDate: '2026-04-22T00:00:00Z',
    region: 'EMEA'
  },
  {
    id: 'acct-1003',
    name: 'Orbit Commerce',
    owner: 'Priya Nair',
    tier: 'Enterprise',
    health: 71,
    nps: 34,
    churnRisk: 'Medium',
    mrr: 31200,
    seats: 210,
    renewalDate: '2026-11-03T00:00:00Z',
    region: 'APAC'
  },
  {
    id: 'acct-1004',
    name: 'Summit Finance',
    owner: 'Alex Rivera',
    tier: 'Scale',
    health: 91,
    nps: 62,
    churnRisk: 'Low',
    mrr: 15400,
    seats: 88,
    renewalDate: '2027-01-10T00:00:00Z',
    region: 'North America'
  }
];

export const PLAYBOOK_STEPS = [
  { id: 'step-1', title: 'Send renewal briefing', owner: 'CSM', enabled: true },
  { id: 'step-2', title: 'Schedule executive check-in', owner: 'CSM', enabled: true },
  { id: 'step-3', title: 'Review open support backlog', owner: 'Support', enabled: false },
  { id: 'step-4', title: 'Share product adoption report', owner: 'CSM', enabled: true }
];

export const ACTIVITY = [
  { id: 1, text: 'Brightline Health health score dropped 12 points', time: '2h ago' },
  { id: 2, text: 'Summit Finance renewed early — NPS 62', time: '5h ago' },
  { id: 3, text: 'Orbit Commerce opened 3 P1 tickets this week', time: 'Yesterday' }
];

export const NPS_HISTORY = [
  { label: 'Jan', value: 38 },
  { label: 'Feb', value: 41 },
  { label: 'Mar', value: 36 },
  { label: 'Apr', value: 44 },
  { label: 'May', value: 42 },
  { label: 'Jun', value: 46 }
];

export const QUEUE_STATS = {
  waiting: 14,
  active: 6,
  avgHandle: '4m 12s',
  slaBreaches: 2
};

export const PORTFOLIO_KPIS = {
  avgHealth: 76,
  atRiskAccounts: 1,
  openEscalations: 3,
  avgNps: 39
};

export const NESTED_REGIONS = [
  {
    label: 'North America',
    value: 'na',
    children: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' }
    ]
  },
  {
    label: 'EMEA',
    value: 'emea',
    children: [
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' }
    ]
  }
];
