import styled, { keyframes } from 'styled-components'
import { NavLink as NavLinkBase } from 'react-router-dom'

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
  critical: '#ef4444',
  high: '#f59e0b',
  medium: '#3b82f6',
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

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const NavLink = styled(NavLinkBase)<{ $active?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => (p.$active ? '#e2e8f0' : '#4a6080')};
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${(p) => (p.$active ? 'rgba(59,130,246,0.12)' : 'transparent')};
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.06);
  }
`

export const SearchBar = styled.div`
  flex: 1;
  max-width: 320px;
  position: relative;
  margin: 0 24px;
`

export const SearchIcon = styled.span`
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a6080;
  font-size: 14px;
  pointer-events: none;
`

export const SearchInput = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid #1e2d45;
  border-radius: 8px;
  padding: 7px 12px 7px 32px;
  font-size: 13px;
  color: #e2e8f0;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
  box-sizing: border-box;

  &::placeholder {
    color: #4a6080;
  }

  &:focus {
    border-color: #3b82f6;
    background: rgba(59,130,246,0.06);
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const UserChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${tokens.border};
  border-radius: 999px;
  padding: 4px 12px 4px 4px;
  cursor: pointer;
  font-family: inherit;
  color: ${tokens.text};
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.4);
  }

  &:focus-visible {
    outline: 2px solid ${tokens.accent};
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 3px;
  }
`

export const UserChipAvatar = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${tokens.primary};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`

export const UserChipMeta = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
  text-align: left;

  @media (max-width: 640px) {
    display: none;
  }
`

export const UserChipName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${tokens.text};
`

export const UserChipEmail = styled.span`
  font-size: 11px;
  color: ${tokens.muted};
`

export const Main = styled.main`
  max-width: 1200px;
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

export const StatusDot = styled.div<{ $active?: boolean; $tone?: 'success' | 'warning' | 'error' | 'muted' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(p) => {
    if (p.$tone === 'error') return tokens.error
    if (p.$tone === 'warning') return tokens.warning
    if (p.$tone === 'success') return tokens.success
    if (p.$tone === 'muted') return tokens.muted
    return p.$active ? tokens.success : tokens.warning
  }};
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

export const Section = styled.section`
  margin-top: 32px;
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4a6080;
  margin: 0 0 16px;
`

/* ============== Operator Console ============== */

export const KpiStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const KpiTile = styled.div`
  background: ${tokens.surface};
  border: 1px solid ${tokens.border};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 92px;
`

export const KpiLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.muted};
`

export const KpiValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${tokens.text};
  letter-spacing: -0.02em;
  line-height: 1.1;
`

export const KpiDelta = styled.div<{ $tone?: 'up' | 'down' | 'neutral' | 'critical' }>`
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => {
    if (p.$tone === 'up') return tokens.success
    if (p.$tone === 'down') return tokens.error
    if (p.$tone === 'critical') return tokens.error
    return tokens.muted
  }};
`

export const Pill = styled.span<{ $tone?: 'success' | 'warning' | 'error' | 'info' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(p) => {
    if (p.$tone === 'success') return 'rgba(34,197,94,0.12)'
    if (p.$tone === 'warning') return 'rgba(245,158,11,0.14)'
    if (p.$tone === 'error') return 'rgba(239,68,68,0.14)'
    if (p.$tone === 'info') return 'rgba(59,130,246,0.14)'
    return 'rgba(74,96,128,0.14)'
  }};
  color: ${(p) => {
    if (p.$tone === 'success') return tokens.success
    if (p.$tone === 'warning') return tokens.warning
    if (p.$tone === 'error') return tokens.error
    if (p.$tone === 'info') return tokens.accent
    return tokens.muted
  }};
  border: 1px solid ${(p) => {
    if (p.$tone === 'success') return 'rgba(34,197,94,0.25)'
    if (p.$tone === 'warning') return 'rgba(245,158,11,0.3)'
    if (p.$tone === 'error') return 'rgba(239,68,68,0.3)'
    if (p.$tone === 'info') return 'rgba(59,130,246,0.3)'
    return 'rgba(74,96,128,0.25)'
  }};
`

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const ChartCardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${tokens.text};
  margin: 0 0 4px;
`

export const ChartCardSubtitle = styled.div`
  font-size: 12px;
  color: ${tokens.muted};
  margin-bottom: 14px;
`

export const ChartContainer = styled.div`
  width: 100%;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

export const Th = styled.th`
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${tokens.muted};
  padding: 8px 10px 8px 0;
  border-bottom: 1px solid #1a2640;
`

export const Td = styled.td`
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #11192a;
  color: ${tokens.text};
  font-size: 13px;
  vertical-align: middle;

  &:last-child {
    text-align: right;
  }
`

export const SystemStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`

export const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  background: ${tokens.surface2};
  border: 1px solid ${tokens.border};
  border-radius: 10px;
`

export const StatusBlockLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.muted};
`

export const StatusBlockValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${tokens.text};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #11192a;
  font-size: 12px;
  color: ${tokens.muted};

  b {
    color: ${tokens.text};
    font-weight: 600;
  }
`

export const PipelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const PipelineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #11192a;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  span:first-of-type {
    flex: 1;
    color: ${tokens.text};
  }
`

export const PipelineMeta = styled.span`
  color: ${tokens.muted};
  font-size: 12px;
  font-weight: 500;
`
