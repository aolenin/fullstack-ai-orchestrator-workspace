import React, { useEffect, useState } from 'react'
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
  LoadingContainer,
  Spinner,
} from './Home.styles'
import {
  PageContainer,
  PageMain,
  ProfileHeader,
  BigAvatar,
  HeaderInfo,
  Eyebrow,
  DisplayName,
  HeaderEmail,
  Grid,
  Card,
  CardTitle,
  Row,
  RowLabel,
  RowValue,
  Pill,
  SignOut,
} from './Profile.styles'

export default function Profile() {
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
    <PageContainer>
      <Header>
        <HeaderLogo>
          <LogoIcon>⚡</LogoIcon>
          <LogoText>AI Risk Platform</LogoText>
        </HeaderLogo>

        <Nav>
          <NavLink to="/">Dashboard</NavLink>
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

      <PageMain>
        <ProfileHeader>
          <BigAvatar>{user.username[0].toUpperCase()}</BigAvatar>
          <HeaderInfo>
            <Eyebrow>Profile</Eyebrow>
            <DisplayName>{displayName}</DisplayName>
            <HeaderEmail>{user.email}</HeaderEmail>
          </HeaderInfo>
        </ProfileHeader>

        <Grid>
          <Card>
            <CardTitle>Account</CardTitle>
            <Row>
              <RowLabel>Username</RowLabel>
              <RowValue>{user.username}</RowValue>
            </Row>
            <Row>
              <RowLabel>Email</RowLabel>
              <RowValue>{user.email}</RowValue>
            </Row>
            <Row>
              <RowLabel>First name</RowLabel>
              <RowValue>{user.first_name || '—'}</RowValue>
            </Row>
            <Row>
              <RowLabel>Last name</RowLabel>
              <RowValue>{user.last_name || '—'}</RowValue>
            </Row>
            <Row>
              <RowLabel>User ID</RowLabel>
              <RowValue>#{user.id}</RowValue>
            </Row>
          </Card>

          <Card>
            <CardTitle>Security</CardTitle>
            <Row>
              <RowLabel>Multi-factor auth</RowLabel>
              <Pill $tone={user.mfa_enabled ? 'success' : 'warning'}>
                {user.mfa_enabled ? 'Enabled' : 'Disabled'}
              </Pill>
            </Row>
            <Row>
              <RowLabel>Password</RowLabel>
              <RowValue>•••••••••</RowValue>
            </Row>
            <Row>
              <RowLabel>Session</RowLabel>
              <Pill $tone="success">Active</Pill>
            </Row>
            <Row>
              <RowLabel>Auth provider</RowLabel>
              <RowValue>Local</RowValue>
            </Row>
          </Card>

          <Card>
            <CardTitle>Access &amp; Roles</CardTitle>
            <Row>
              <RowLabel>Role</RowLabel>
              <Pill $tone="success">Risk Operator</Pill>
            </Row>
            <Row>
              <RowLabel>Workspace</RowLabel>
              <RowValue>Netevia</RowValue>
            </Row>
            <Row>
              <RowLabel>Permissions</RowLabel>
              <RowValue>Read · Review · Override</RowValue>
            </Row>
          </Card>

          <Card>
            <CardTitle>Preferences</CardTitle>
            <Row>
              <RowLabel>Theme</RowLabel>
              <RowValue>Dark</RowValue>
            </Row>
            <Row>
              <RowLabel>Locale</RowLabel>
              <RowValue>en-US</RowValue>
            </Row>
            <Row>
              <RowLabel>Notifications</RowLabel>
              <Pill $tone="success">Email + In-app</Pill>
            </Row>
          </Card>
        </Grid>

        <SignOut onClick={handleLogout}>Sign out of this session</SignOut>
      </PageMain>
    </PageContainer>
  )
}
