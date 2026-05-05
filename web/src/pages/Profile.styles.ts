import styled from 'styled-components'

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
  error: '#ef4444',
}

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${tokens.bg};
  display: flex;
  flex-direction: column;
`

export const PageMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  background: ${tokens.surface};
  border: 1px solid ${tokens.border};
  border-radius: 18px;
  padding: 28px 30px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

export const BigAvatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${tokens.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  flex-shrink: 0;
`

export const HeaderInfo = styled.div`
  flex: 1;
`

export const Eyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${tokens.muted};
  margin: 0 0 4px;
`

export const DisplayName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
  color: #f1f5f9;
`

export const HeaderEmail = styled.p`
  font-size: 14px;
  color: ${tokens.muted};
  margin: 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background: ${tokens.surface};
  border: 1px solid ${tokens.border};
  border-radius: 16px;
  padding: 22px 24px;
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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #1a2640;
  font-size: 14px;
  color: ${tokens.text};
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }
`

export const RowLabel = styled.span`
  color: ${tokens.muted};
  font-size: 13px;
`

export const RowValue = styled.b`
  font-weight: 600;
  color: ${tokens.text};
  text-align: right;
  word-break: break-all;
`

export const Pill = styled.span<{ $tone: 'success' | 'warning' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(p) => {
    if (p.$tone === 'success') return 'rgba(34,197,94,0.12)'
    if (p.$tone === 'warning') return 'rgba(245,158,11,0.14)'
    return 'rgba(74,96,128,0.14)'
  }};
  color: ${(p) => {
    if (p.$tone === 'success') return tokens.success
    if (p.$tone === 'warning') return tokens.warning
    return tokens.muted
  }};
  border: 1px solid ${(p) => {
    if (p.$tone === 'success') return 'rgba(34,197,94,0.25)'
    if (p.$tone === 'warning') return 'rgba(245,158,11,0.3)'
    return 'rgba(74,96,128,0.25)'
  }};
`

export const SignOut = styled.button`
  margin-top: 20px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: ${tokens.error};
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`
