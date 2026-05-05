import styled, { keyframes } from 'styled-components'

const tokens = {
  primary: '#1e3a5f',
  accent: '#3b82f6',
  bg: '#080c14',
  surface: '#0f1623',
  surface2: '#151e2e',
  border: '#1e2d45',
  text: '#e2e8f0',
  muted: '#4a6080',
  success: '#22c55e',
  warning: '#f59e0b',
}

export const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${tokens.bg};
`

export const Header = styled.header`
  background: #0a1628;
  padding: 15px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${tokens.border};

  @media (max-width: 640px) {
    padding: 13px 16px;
  }
`

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const LogoIcon = styled.span`
  font-size: 20px;
  background: rgba(59, 130, 246, 0.15);
  padding: 6px 10px;
  border-radius: 10px;
`

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: -0.01em;
`

export const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`

export const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
  width: 100%;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`

export const WelcomeBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  background: ${tokens.surface};
  border-radius: 18px;
  padding: 26px 30px;
  border: 1px solid ${tokens.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

export const Avatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: ${tokens.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  flex-shrink: 0;
`

export const Eyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${tokens.muted};
  margin: 0 0 4px;
`

export const Greeting = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
  color: #f1f5f9;
`

export const EmailText = styled.p`
  font-size: 14px;
  color: ${tokens.muted};
  margin: 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background: ${tokens.surface};
  border-radius: 16px;
  padding: 22px 24px;
  border: 1px solid ${tokens.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`

export const CardTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: ${tokens.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 14px;
`

export const ProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #1a2640;
  font-size: 14px;
  color: ${tokens.text};

  &:last-child {
    border-bottom: none;
  }

  span {
    color: ${tokens.muted};
  }
`

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #1a2640;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  span {
    flex: 1;
    color: #94a3b8;
  }
`

export const StatusDot = styled.div<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(p) => (p.$active ? tokens.success : tokens.warning)};
`

export const StatusLabel = styled.b<{ $active?: boolean }>`
  font-size: 13px;
  color: ${(p) => (p.$active ? tokens.success : tokens.warning)};
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid ${tokens.border};
  border-top-color: ${tokens.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`
