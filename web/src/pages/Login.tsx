import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/authApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import {
  AuthContainer,
  AuthCard,
  LogoWrapper,
  LogoIcon,
  LogoText,
  Title,
  Subtitle,
  ErrorBox,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Footer,
  Link,
} from './Login.styles'

function extractErrorMessage(error: unknown): string {
  if (!error) return 'Login failed'
  const fetchError = error as FetchBaseQueryError
  if (fetchError.status !== undefined) {
    const data = fetchError.data as Record<string, unknown> | undefined
    if (data?.detail && typeof data.detail === 'string') return data.detail
    if (data) {
      return Object.entries(data)
        .map(([k, v]) => {
          const val = Array.isArray(v) ? v.join(' ') : String(v)
          return k === 'non_field_errors' ? val : `${k}: ${val}`
        })
        .join(' | ')
    }
  }
  return 'Login failed'
}

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMutation, { isLoading, error }] = useLoginMutation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const data = await loginMutation({ username, password }).unwrap()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      navigate('/')
    } catch {
      // error is captured by RTK Query hook state
    }
  }

  return (
    <AuthContainer>
      <AuthCard>
        <LogoWrapper>
          <LogoIcon>⚡</LogoIcon>
          <LogoText>AI Risk Platform</LogoText>
        </LogoWrapper>
        <Title>Sign in</Title>
        <Subtitle>Enter your credentials to access the platform</Subtitle>

        {error && <ErrorBox>{extractErrorMessage(error)}</ErrorBox>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              required
              autoFocus
              autoComplete="username"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in'}
          </SubmitButton>
        </Form>

        <Footer>
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </Footer>
      </AuthCard>
    </AuthContainer>
  )
}
