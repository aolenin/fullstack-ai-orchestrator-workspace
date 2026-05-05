import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

const tokens = {
  primary: '#1e3a5f',
  accent: '#3b82f6',
  accentHover: '#2563eb',
  bg: '#080c14',
  surface: '#0f1623',
  surface2: '#151e2e',
  border: '#1e2d45',
  text: '#e2e8f0',
  muted: '#4a6080',
  errorBg: '#160a0a',
  error: '#f87171',
  success: '#22c55e',
  warning: '#f59e0b',
}

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #050911 0%, #0d1f3c 100%);
`

export const AuthCard = styled.div`
  background: ${tokens.surface};
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  border: 1px solid ${tokens.border};
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);

  @media (max-width: 640px) {
    padding: 28px 20px;
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
`

export const LogoIcon = styled.span`
  font-size: 20px;
  background: ${tokens.primary};
  padding: 6px 10px;
  border-radius: 10px;
`

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${tokens.text};
  letter-spacing: -0.01em;
`

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
  color: #f1f5f9;
`

export const Subtitle = styled.p`
  color: ${tokens.muted};
  margin: 0 0 24px;
  font-size: 14px;
`

export const ErrorBox = styled.div`
  background: ${tokens.errorBg};
  color: ${tokens.error};
  border: 1px solid #3d1212;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 13px;
  margin-bottom: 18px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
`

export const Input = styled.input`
  border: 1.5px solid ${tokens.border};
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 14px;
  color: ${tokens.text};
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  background: ${tokens.surface2};
  width: 100%;
  font-family: inherit;

  &:focus {
    border-color: ${tokens.accent};
    background: #0f1a2e;
  }

  &::placeholder {
    color: #2d4060;
  }
`

export const SubmitButton = styled.button`
  background: #1e40af;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  margin-top: 4px;
  font-family: inherit;
  width: 100%;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Footer = styled.p`
  text-align: center;
  margin: 22px 0 0;
  font-size: 14px;
  color: ${tokens.muted};
`

export const Link = styled(RouterLink)`
  color: ${tokens.accent};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
