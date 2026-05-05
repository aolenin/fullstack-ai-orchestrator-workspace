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
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
} from './Merchants.styles'

export default function Merchants() {
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
          <NavLink to="/agents">Agents</NavLink>
          <NavLink to="/merchants" $active>Merchants</NavLink>
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
          <PageTitle>Merchants</PageTitle>
        </PageHeader>

        <EmptyState>
          <EmptyIcon>🏪</EmptyIcon>
          <EmptyTitle>No merchants yet</EmptyTitle>
          <EmptySubtitle>Merchant data will appear here once the ingestion pipeline is active.</EmptySubtitle>
        </EmptyState>
      </PageMain>
    </PageContainer>
  )
}
