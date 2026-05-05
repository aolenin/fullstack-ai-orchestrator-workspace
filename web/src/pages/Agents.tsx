import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery, useLogoutMutation } from '../store/authApi'
import {
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
} from './Home.styles'
import {
  PageContainer,
  PageMain,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SectionTitle,
  AgentGrid,
  AgentCard,
  AgentHeader,
  AgentEmoji,
  AgentName,
  AgentTags,
  AgentTag,
  WorkflowBlock,
  WorkflowTitle,
  WorkflowSteps,
  WorkflowStep,
  Section,
} from './Agents.styles'

const AGENTS = [
  {
    emoji: '🛡️',
    name: 'Fraud Detection Agent',
    tags: ['velocity', 'duplicates', '17 signal types'],
  },
  {
    emoji: '📊',
    name: 'ML Agent',
    tags: ['XGBoost', 'anomaly detection', 'scoring'],
  },
  {
    emoji: '⚖️',
    name: 'Decision Agent',
    tags: ['HOLD / APPROVE', 'thresholds', 'business logic'],
  },
  {
    emoji: '📬',
    name: 'Notification Agent',
    tags: ['email', 'alerts', 'partners'],
  },
  {
    emoji: '🔁',
    name: 'Feedback Agent',
    tags: ['self-correction', 'retraining', 'false positive reduction'],
  },
  {
    emoji: '🧾',
    name: 'Compliance Agent',
    tags: ['Visa / Mastercard', 'audit logs'],
  },
]

export default function Agents() {
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')
  const [logoutMutation] = useLogoutMutation()
  const { data: user } = useGetMeQuery()

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

  return (
    <PageContainer>
      <Header>
        <HeaderLogo>
          <LogoIcon>⚡</LogoIcon>
          <LogoText>AI Risk Platform</LogoText>
        </HeaderLogo>

        <Nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/agents" $active>Agents</NavLink>
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
          {user && (
            <UserChip onClick={() => navigate('/profile')} aria-label="Open profile">
              <UserChipAvatar>{user.username[0].toUpperCase()}</UserChipAvatar>
              <UserChipMeta>
                <UserChipName>
                  {[user.first_name, user.last_name].filter(Boolean).join(' ') || user.username}
                </UserChipName>
                <UserChipEmail>{user.email}</UserChipEmail>
              </UserChipMeta>
            </UserChip>
          )}
          <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>
        </HeaderRight>
      </Header>

      <PageMain>
        <PageHeader>
          <div>
            <PageTitle>Архитектура агентов</PageTitle>
            <PageSubtitle>Operational agents that drive the AI Risk Platform.</PageSubtitle>
          </div>
        </PageHeader>

        <Section>
          <SectionTitle>Agent fleet</SectionTitle>
          <AgentGrid>
            {AGENTS.map((agent) => (
              <AgentCard key={agent.name}>
                <AgentHeader>
                  <AgentEmoji>{agent.emoji}</AgentEmoji>
                  <AgentName>{agent.name}</AgentName>
                </AgentHeader>
                <AgentTags>
                  {agent.tags.map((tag) => (
                    <AgentTag key={tag}>{tag}</AgentTag>
                  ))}
                </AgentTags>
              </AgentCard>
            ))}
          </AgentGrid>

          <WorkflowBlock>
            <WorkflowTitle>Orchestration Workflow</WorkflowTitle>
            <WorkflowSteps>
              <WorkflowStep>Collect transactions</WorkflowStep>
              <WorkflowStep>Run <b>fraud-agent</b> → velocity, duplicates, 17 signals</WorkflowStep>
              <WorkflowStep>Run <b>ml-agent</b> → XGBoost score + anomaly detection</WorkflowStep>
              <WorkflowStep>Combine signals</WorkflowStep>
              <WorkflowStep><b>decision-agent</b> decides: HOLD / APPROVE</WorkflowStep>
              <WorkflowStep><b>notification-agent</b> sends alerts to merchant + ISO + agent</WorkflowStep>
              <WorkflowStep><b>feedback-agent</b> updates model, reduces false positives</WorkflowStep>
            </WorkflowSteps>
          </WorkflowBlock>
        </Section>
      </PageMain>
    </PageContainer>
  )
}
