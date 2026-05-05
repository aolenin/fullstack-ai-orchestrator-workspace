import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../store/authApi'
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
  FormRow,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Footer,
  Link,
} from './Register.styles'

function extractErrorMessage(error: unknown): string {
  if (!error) return 'Registration failed'
  const fetchError = error as FetchBaseQueryError
  if (fetchError.status !== undefined) {
    const data = fetchError.data as Record<string, unknown> | undefined
    if (data) {
      return Object.entries(data)
        .map(([k, v]) => {
          const val = Array.isArray(v) ? v.join(' ') : String(v)
          return k === 'non_field_errors' ? val : `${k}: ${val}`
        })
        .join(' | ')
    }
  }
  return 'Registration failed'
}

interface FormState {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password2: string
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  })
  const [validationError, setValidationError] = useState('')
  const [registerMutation, { isLoading, error }] = useRegisterMutation()

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationError('')
    if (form.password !== form.password2) {
      setValidationError('Passwords do not match')
      return
    }
    try {
      const data = await registerMutation({
        username: form.username,
        email: form.email,
        password: form.password,
        password2: form.password2,
        first_name: form.first_name,
        last_name: form.last_name,
      }).unwrap()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      navigate('/')
    } catch {
      // error is captured by RTK Query hook state
    }
  }

  const displayError = validationError || (error ? extractErrorMessage(error) : '')

  return (
    <AuthContainer>
      <AuthCard>
        <LogoWrapper>
          <LogoIcon>⚡</LogoIcon>
          <LogoText>AI Risk Platform</LogoText>
        </LogoWrapper>
        <Title>Create account</Title>
        <Subtitle>Join the AI Risk Platform</Subtitle>

        {displayError && <ErrorBox>{displayError}</ErrorBox>}

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>First name</Label>
              <Input
                type="text"
                value={form.first_name}
                onChange={set('first_name')}
                placeholder="John"
                autoComplete="given-name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Last name</Label>
              <Input
                type="text"
                value={form.last_name}
                onChange={set('last_name')}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={form.username}
              onChange={set('username')}
              placeholder="john_doe"
              required
              autoFocus
              autoComplete="username"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="john@company.com"
              required
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="••••••••"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm password</Label>
            <Input
              type="password"
              value={form.password2}
              onChange={set('password2')}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account…' : 'Create account'}
          </SubmitButton>
        </Form>

        <Footer>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </Footer>
      </AuthCard>
    </AuthContainer>
  )
}
