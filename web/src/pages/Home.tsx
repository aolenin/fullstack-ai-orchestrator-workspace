import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts'
import { useGetMeQuery, useLogoutMutation } from '../store/authApi'
import {
  HomeContainer,
  Header,
  HeaderLogo,
  LogoIcon,
  LogoText,
  LogoutButton,
  Nav,
  NavLink,
  SearchBar,
  SearchIcon,
  SearchInput,
  HeaderRight,
  UserChip,
  UserChipAvatar,
  UserChipMeta,
  UserChipName,
  UserChipEmail,
  Main,
  Card,
  CardTitle,
  StatusDot,
  LoadingContainer,
  Spinner,
  Section,
  KpiStrip,
  KpiTile,
  KpiLabel,
  KpiValue,
  KpiDelta,
  Pill,
  TwoCol,
  ChartCardTitle,
  ChartCardSubtitle,
  ChartContainer,
  Table,
  Th,
  Td,
  SystemStatusGrid,
  StatusBlock,
  StatusBlockLabel,
  StatusBlockValue,
  FooterRow,
  PipelineList,
  PipelineRow,
  PipelineMeta,
} from './Home.styles'

/* =================== MOCK DATA =================== */

const MOCK_KPIS = {
  txProcessed: '48,217',
  txDelta: '+4.8% vs yesterday',
  criticalFlags: 23,
  criticalDelta: '+5 vs yesterday',
  autoHolds: 14,
  autoHoldsDelta: '8 active, 6 released',
  manualReview: 7,
  manualReviewDelta: '2 over SLA',
  fpr: '3.2%',
  fprDelta: '-0.4% vs last 7d',
  agentRunSla: 'On time',
  agentRunDelta: 'last run 05:00 · briefing 07:30 ✓',
}

const MOCK_SYSTEM = {
  lastAgentRun: '05:00 today',
  morningBriefing: 'Delivered 07:30',
  activeHolds: 14,
  casesWaiting: 7,
  criticalAlerts: 23,
}

const MOCK_RISK_SUMMARY = [
  { name: 'Critical', value: 23, color: '#ef4444' },
  { name: 'High', value: 41, color: '#f59e0b' },
  { name: 'Medium', value: 78, color: '#3b82f6' },
]

type AgentStatus = 'OK' | 'Degraded' | 'Failed'
const MOCK_AGENT_FLEET: { name: string; status: AgentStatus; jobs: number; avgDuration: string }[] = [
  { name: 'Fraud Agent', status: 'OK', jobs: 12, avgDuration: '1.4s' },
  { name: 'ML Scoring Agent', status: 'OK', jobs: 9, avgDuration: '2.1s' },
  { name: 'Decision Agent', status: 'Degraded', jobs: 5, avgDuration: '3.6s' },
  { name: 'Notification Agent', status: 'OK', jobs: 18, avgDuration: '0.7s' },
  { name: 'Compliance Agent', status: 'OK', jobs: 2, avgDuration: '5.2s' },
  { name: 'Feedback Agent', status: 'Failed', jobs: 0, avgDuration: '—' },
]

type Severity = 'Critical' | 'High' | 'Medium'
const SEV_COLOR: Record<Severity, string> = {
  Critical: '#ef4444',
  High: '#f59e0b',
  Medium: '#3b82f6',
}

const MOCK_FLAGS: { name: string; count: number; severity: Severity }[] = [
  { name: 'Duplicate BIN', count: 142, severity: 'Critical' },
  { name: 'Auth/Capture Gap', count: 118, severity: 'Critical' },
  { name: 'Duplicate Auths', count: 96, severity: 'Critical' },
  { name: 'High Velocity', count: 87, severity: 'Critical' },
  { name: 'Dollar Clusters', count: 71, severity: 'High' },
  { name: 'Large Anomalies', count: 64, severity: 'High' },
  { name: 'AVS/CVV Spikes', count: 58, severity: 'High' },
  { name: 'Device Fingerprinting', count: 52, severity: 'High' },
  { name: 'Unmatched Credits', count: 47, severity: 'High' },
  { name: 'BIN+Auth Correlation', count: 41, severity: 'High' },
  { name: 'Proxy/VPN/TOR', count: 38, severity: 'Medium' },
  { name: 'Host Capture Voids', count: 33, severity: 'Medium' },
  { name: 'BIN Concentration', count: 29, severity: 'Medium' },
  { name: 'Same Billing Address', count: 24, severity: 'Medium' },
  { name: 'Force Post', count: 19, severity: 'Medium' },
  { name: 'Deposit Spike', count: 15, severity: 'Medium' },
  { name: 'TBD (flag 17)', count: 6, severity: 'Medium' },
]

const MOCK_HOLDS_14D = [
  { day: 'Apr 22', autoHold: 9, autoReleased: 3, manualReview: 4 },
  { day: 'Apr 23', autoHold: 11, autoReleased: 4, manualReview: 6 },
  { day: 'Apr 24', autoHold: 8, autoReleased: 5, manualReview: 5 },
  { day: 'Apr 25', autoHold: 13, autoReleased: 6, manualReview: 7 },
  { day: 'Apr 26', autoHold: 12, autoReleased: 4, manualReview: 5 },
  { day: 'Apr 27', autoHold: 16, autoReleased: 7, manualReview: 9 },
  { day: 'Apr 28', autoHold: 10, autoReleased: 5, manualReview: 6 },
  { day: 'Apr 29', autoHold: 15, autoReleased: 6, manualReview: 8 },
  { day: 'Apr 30', autoHold: 14, autoReleased: 8, manualReview: 7 },
  { day: 'May 01', autoHold: 18, autoReleased: 9, manualReview: 10 },
  { day: 'May 02', autoHold: 17, autoReleased: 7, manualReview: 8 },
  { day: 'May 03', autoHold: 12, autoReleased: 5, manualReview: 6 },
  { day: 'May 04', autoHold: 16, autoReleased: 8, manualReview: 9 },
  { day: 'May 05', autoHold: 14, autoReleased: 6, manualReview: 7 },
]

const MOCK_ML_30D = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  const conf = 78 + Math.sin(i / 3) * 4 + (i / 30) * 2
  const fpr = 5.4 - (i / 30) * 2.0 + Math.cos(i / 4) * 0.3
  return {
    day: `D${day}`,
    confidence: Number(conf.toFixed(1)),
    fpr: Number(Math.max(2.5, fpr).toFixed(2)),
  }
})

type ComplianceStatus = 'OK' | 'Warning' | 'Review'
const MOCK_COMPLIANCE: {
  program: string
  current: string
  internal: string
  official: string
  status: ComplianceStatus
}[] = [
  { program: 'VAMP Acquirer', current: '0.28%', internal: '0.35%', official: '0.5%', status: 'OK' },
  { program: 'VAMP Merchant', current: '0.82%', internal: '1.0%', official: '1.5%', status: 'Warning' },
  { program: 'ECP', current: '60', internal: '75', official: '100', status: 'OK' },
  { program: 'VIRP', current: '0', internal: 'any', official: 'zero', status: 'OK' },
  { program: 'BRAM/QMAP', current: '1 flag', internal: 'zero', official: 'zero', status: 'Review' },
]

const MOCK_PIPELINE = [
  { label: 'TSYS Mreports batch', meta: 'Received 04:42', tone: 'success' as const },
  { label: 'Last batch records', meta: '48,217', tone: 'success' as const },
  { label: 'Ingestion lag', meta: '12 min', tone: 'warning' as const },
  { label: 'Failed records', meta: '3', tone: 'warning' as const },
  { label: 'ACH reject feed', meta: 'Active', tone: 'success' as const },
  { label: 'OOP flag queue size', meta: '114', tone: 'warning' as const },
]

const MOCK_NOTIFICATIONS = [
  { channel: 'Merchant emails', count: 142 },
  { channel: 'ISO emails', count: 38 },
  { channel: 'Agent emails', count: 26 },
  { channel: 'SMS sent', count: 71 },
  { channel: 'Failed', count: 4 },
]

/* =================== Helpers =================== */

const tooltipStyle = {
  background: '#0f1623',
  border: '1px solid #1e2d45',
  borderRadius: 8,
  color: '#e2e8f0',
  fontSize: 12,
}

const labelStyle = { color: '#e2e8f0', fontWeight: 600 }
const itemStyle = { color: '#e2e8f0' }

function statusToTone(status: AgentStatus): 'success' | 'warning' | 'error' {
  if (status === 'OK') return 'success'
  if (status === 'Degraded') return 'warning'
  return 'error'
}

function complianceToTone(status: ComplianceStatus): 'success' | 'warning' | 'error' {
  if (status === 'OK') return 'success'
  if (status === 'Warning') return 'warning'
  return 'error'
}

/* =================== Page =================== */

export default function Home() {
  const navigate = useNavigate()
  const { data: user, isLoading, error } = useGetMeQuery()
  const [logoutMutation] = useLogoutMutation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (error) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/login')
    }
  }, [error, navigate])

  async function handleLogout() {
    const refresh = localStorage.getItem('refresh_token') || ''
    try {
      await logoutMutation({ refresh }).unwrap()
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/login')
    }
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    )
  }

  if (!user) return null

  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username

  return (
    <HomeContainer>
      <Header>
        <HeaderLogo>
          <LogoIcon>⚡</LogoIcon>
          <LogoText>AI Risk Platform</LogoText>
        </HeaderLogo>

        <Nav>
          <NavLink to="/" $active>Dashboard</NavLink>
          <NavLink to="/agents">Agents</NavLink>
          <NavLink to="/merchants">Merchants</NavLink>
        </Nav>

        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Find merchants, transactions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBar>

        <HeaderRight>
          <UserChip onClick={() => navigate('/profile')} aria-label="Open profile">
            <UserChipAvatar>{user.username[0].toUpperCase()}</UserChipAvatar>
            <UserChipMeta>
              <UserChipName>{displayName}</UserChipName>
              <UserChipEmail>{user.email}</UserChipEmail>
            </UserChipMeta>
          </UserChip>
          <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>
        </HeaderRight>
      </Header>

      <Main>
        {/* ============ Section 0 — KPI strip ============ */}
        <KpiStrip>
          <KpiTile>
            <KpiLabel>Transactions Processed</KpiLabel>
            <KpiValue>{MOCK_KPIS.txProcessed}</KpiValue>
            <KpiDelta $tone="up">↑ {MOCK_KPIS.txDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>Critical Flags</KpiLabel>
            <KpiValue>{MOCK_KPIS.criticalFlags}</KpiValue>
            <KpiDelta $tone="critical">↑ {MOCK_KPIS.criticalDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>Auto Holds</KpiLabel>
            <KpiValue>{MOCK_KPIS.autoHolds}</KpiValue>
            <KpiDelta>{MOCK_KPIS.autoHoldsDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>Manual Review Queue</KpiLabel>
            <KpiValue>{MOCK_KPIS.manualReview}</KpiValue>
            <KpiDelta $tone="down">{MOCK_KPIS.manualReviewDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>False Positive Rate</KpiLabel>
            <KpiValue>{MOCK_KPIS.fpr}</KpiValue>
            <KpiDelta $tone="up">↓ {MOCK_KPIS.fprDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>Compliance Risk</KpiLabel>
            <KpiValue>
              <Pill $tone="warning">Warning</Pill>
            </KpiValue>
            <KpiDelta>1 program in review</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>Agent Run SLA</KpiLabel>
            <KpiValue>
              <Pill $tone="success">On time</Pill>
            </KpiValue>
            <KpiDelta>{MOCK_KPIS.agentRunDelta}</KpiDelta>
          </KpiTile>
          <KpiTile>
            <KpiLabel>System Health</KpiLabel>
            <KpiValue>
              <Pill $tone="warning">Degraded</Pill>
            </KpiValue>
            <KpiDelta>1 agent failed, 1 degraded</KpiDelta>
          </KpiTile>
        </KpiStrip>

        {/* ============ Section 1 — System Status ============ */}
        <Section>
          <Card>
            <CardTitle>System Status</CardTitle>
            <SystemStatusGrid>
              <StatusBlock>
                <StatusBlockLabel>Last Agent Run</StatusBlockLabel>
                <StatusBlockValue>
                  <StatusDot $tone="success" />
                  {MOCK_SYSTEM.lastAgentRun}
                </StatusBlockValue>
              </StatusBlock>
              <StatusBlock>
                <StatusBlockLabel>Morning Briefing</StatusBlockLabel>
                <StatusBlockValue>
                  <StatusDot $tone="success" />
                  {MOCK_SYSTEM.morningBriefing}
                </StatusBlockValue>
              </StatusBlock>
              <StatusBlock>
                <StatusBlockLabel>Active Holds</StatusBlockLabel>
                <StatusBlockValue>
                  <StatusDot $tone="warning" />
                  {MOCK_SYSTEM.activeHolds}
                </StatusBlockValue>
              </StatusBlock>
              <StatusBlock>
                <StatusBlockLabel>Cases Waiting Review</StatusBlockLabel>
                <StatusBlockValue>
                  <StatusDot $tone="warning" />
                  {MOCK_SYSTEM.casesWaiting}
                </StatusBlockValue>
              </StatusBlock>
              <StatusBlock>
                <StatusBlockLabel>Critical Alerts</StatusBlockLabel>
                <StatusBlockValue>
                  <StatusDot $tone="error" />
                  {MOCK_SYSTEM.criticalAlerts}
                </StatusBlockValue>
              </StatusBlock>
            </SystemStatusGrid>
          </Card>
        </Section>

        {/* ============ Section 2 — Risk Summary + Agent Fleet ============ */}
        <TwoCol>
          <Card>
            <ChartCardTitle>Risk Summary</ChartCardTitle>
            <ChartCardSubtitle>Severity breakdown — last 24h</ChartCardSubtitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={MOCK_RISK_SUMMARY}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="#0f1623"
                  >
                    {MOCK_RISK_SUMMARY.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    itemStyle={itemStyle}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: 12, color: '#e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card>
            <ChartCardTitle>Agent &amp; Worker Status</ChartCardTitle>
            <ChartCardSubtitle>Live fleet metrics</ChartCardSubtitle>
            <Table>
              <thead>
                <tr>
                  <Th>Agent</Th>
                  <Th>Status</Th>
                  <Th>Jobs</Th>
                  <Th>Avg dur.</Th>
                </tr>
              </thead>
              <tbody>
                {MOCK_AGENT_FLEET.map((a) => (
                  <tr key={a.name}>
                    <Td>{a.name}</Td>
                    <Td>
                      <Pill $tone={statusToTone(a.status)}>{a.status}</Pill>
                    </Td>
                    <Td>{a.jobs}</Td>
                    <Td>{a.avgDuration}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TwoCol>

        {/* ============ Section 3 — Flag breakdown + Holds & Decisions ============ */}
        <TwoCol>
          <Card>
            <ChartCardTitle>Flag Breakdown</ChartCardTitle>
            <ChartCardSubtitle>All 17 flags · today</ChartCardSubtitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={420}>
                <BarChart
                  data={MOCK_FLAGS}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
                >
                  <CartesianGrid stroke="#1a2640" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="#4a6080" fontSize={11} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#4a6080"
                    fontSize={11}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    itemStyle={itemStyle}
                    cursor={{ fill: 'rgba(59,130,246,0.06)' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {MOCK_FLAGS.map((f) => (
                      <Cell key={f.name} fill={SEV_COLOR[f.severity]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card>
            <ChartCardTitle>Holds &amp; Decisions</ChartCardTitle>
            <ChartCardSubtitle>Last 14 days · stacked</ChartCardSubtitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={420}>
                <AreaChart
                  data={MOCK_HOLDS_14D}
                  margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="gAutoHold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.65} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gAutoRel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.65} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.65} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1a2640" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#4a6080" fontSize={11} />
                  <YAxis stroke="#4a6080" fontSize={11} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    itemStyle={itemStyle}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#e2e8f0' }} />
                  <Area
                    type="monotone"
                    dataKey="autoHold"
                    name="Auto-HOLD"
                    stackId="1"
                    stroke="#ef4444"
                    fill="url(#gAutoHold)"
                  />
                  <Area
                    type="monotone"
                    dataKey="autoReleased"
                    name="Auto-released"
                    stackId="1"
                    stroke="#22c55e"
                    fill="url(#gAutoRel)"
                  />
                  <Area
                    type="monotone"
                    dataKey="manualReview"
                    name="Manual review"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#gManual)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </TwoCol>

        {/* ============ Section 4 — ML quality + Compliance ============ */}
        <TwoCol>
          <Card>
            <ChartCardTitle>ML Quality</ChartCardTitle>
            <ChartCardSubtitle>Confidence vs false-positive rate · last 30d</ChartCardSubtitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={MOCK_ML_30D} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                  <CartesianGrid stroke="#1a2640" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#4a6080" fontSize={11} />
                  <YAxis stroke="#4a6080" fontSize={11} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    itemStyle={itemStyle}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#e2e8f0' }} />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    name="Avg confidence (%)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="fpr"
                    name="False positive rate (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <FooterRow>
              <span>
                Model version: <b>v2.4.1</b>
              </span>
              <span>
                Training data freshness: <b>2 days</b>
              </span>
              <span>
                Drift score: <b>0.07</b>
              </span>
            </FooterRow>
          </Card>

          <Card>
            <ChartCardTitle>Compliance Status</ChartCardTitle>
            <ChartCardSubtitle>Programs vs internal &amp; official thresholds</ChartCardSubtitle>
            <Table>
              <thead>
                <tr>
                  <Th>Program</Th>
                  <Th>Current</Th>
                  <Th>Internal</Th>
                  <Th>Official</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COMPLIANCE.map((c) => (
                  <tr key={c.program}>
                    <Td>{c.program}</Td>
                    <Td>{c.current}</Td>
                    <Td>{c.internal}</Td>
                    <Td>{c.official}</Td>
                    <Td>
                      <Pill $tone={complianceToTone(c.status)}>{c.status}</Pill>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TwoCol>

        {/* ============ Section 5 — Pipeline + Notifications ============ */}
        <TwoCol>
          <Card>
            <ChartCardTitle>Data Pipeline / Ingestion</ChartCardTitle>
            <ChartCardSubtitle>Today · TSYS Mreports + ACH</ChartCardSubtitle>
            <PipelineList>
              {MOCK_PIPELINE.map((row) => (
                <PipelineRow key={row.label}>
                  <StatusDot $tone={row.tone} />
                  <span>{row.label}</span>
                  <PipelineMeta>{row.meta}</PipelineMeta>
                </PipelineRow>
              ))}
            </PipelineList>
          </Card>

          <Card>
            <ChartCardTitle>Notifications</ChartCardTitle>
            <ChartCardSubtitle>Today · email + SMS dispatch</ChartCardSubtitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={MOCK_NOTIFICATIONS}
                  margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
                >
                  <CartesianGrid stroke="#1a2640" strokeDasharray="3 3" />
                  <XAxis dataKey="channel" stroke="#4a6080" fontSize={11} />
                  <YAxis stroke="#4a6080" fontSize={11} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={labelStyle}
                    itemStyle={itemStyle}
                    cursor={{ fill: 'rgba(59,130,246,0.06)' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                    {MOCK_NOTIFICATIONS.map((n) => (
                      <Cell
                        key={n.channel}
                        fill={n.channel === 'Failed' ? '#ef4444' : '#3b82f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <FooterRow>
              <span>
                Avg notification latency: <b>1.8s</b>
              </span>
              <span>
                Delivery success: <b>98.6%</b>
              </span>
            </FooterRow>
          </Card>
        </TwoCol>
      </Main>
    </HomeContainer>
  )
}
