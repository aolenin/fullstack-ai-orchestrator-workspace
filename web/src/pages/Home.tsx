import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery, useLogoutMutation } from '../store/authApi'
import {
  HomeContainer,
  Header,
  HeaderLogo,
  LogoIcon,
  LogoText,
  LogoutButton,
  Main,
  WelcomeBanner,
  Avatar,
  Eyebrow,
  Greeting,
  EmailText,
  Grid,
  Card,
  CardTitle,
  ProfileRow,
  StatusRow,
  StatusDot,
  StatusLabel,
  LoadingContainer,
  Spinner,
} from './Home.styles'

export default function Home() {
  const navigate = useNavigate()
  const { data: user, isLoading, error } = useGetMeQuery()
  const [logoutMutation] = useLogoutMutation()

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
        <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>
      </Header>

      <Main>
        <WelcomeBanner>
          <Avatar>{user.username[0].toUpperCase()}</Avatar>
          <div>
            <Eyebrow>Welcome back</Eyebrow>
            <Greeting>{displayName}</Greeting>
            <EmailText>{user.email}</EmailText>
          </div>
        </WelcomeBanner>

        <Grid>
          <Card>
            <CardTitle>Profile</CardTitle>
            <ProfileRow>
              <span>Username</span>
              <b>{user.username}</b>
            </ProfileRow>
            <ProfileRow>
              <span>Email</span>
              <b>{user.email}</b>
            </ProfileRow>
            {user.first_name && (
              <ProfileRow>
                <span>First name</span>
                <b>{user.first_name}</b>
              </ProfileRow>
            )}
            {user.last_name && (
              <ProfileRow>
                <span>Last name</span>
                <b>{user.last_name}</b>
              </ProfileRow>
            )}
            <ProfileRow>
              <span>MFA</span>
              <StatusLabel $active={user.mfa_enabled}>
                {user.mfa_enabled ? 'Enabled' : 'Disabled'}
              </StatusLabel>
            </ProfileRow>
          </Card>

          <Card>
            <CardTitle>Platform Status</CardTitle>
            <StatusRow>
              <StatusDot $active />
              <span>Authentication service</span>
              <StatusLabel $active>Active</StatusLabel>
            </StatusRow>
            <StatusRow>
              <StatusDot $active />
              <span>Rules engine (Phase 1)</span>
              <StatusLabel $active>Active</StatusLabel>
            </StatusRow>
            <StatusRow>
              <StatusDot />
              <span>ML scoring</span>
              <StatusLabel>Pending</StatusLabel>
            </StatusRow>
            <StatusRow>
              <StatusDot />
              <span>Compliance monitoring</span>
              <StatusLabel>Pending</StatusLabel>
            </StatusRow>
          </Card>
        </Grid>
      </Main>
    </HomeContainer>
  )
}
