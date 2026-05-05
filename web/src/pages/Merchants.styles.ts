import styled from 'styled-components'

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #080c14;
  display: flex;
  flex-direction: column;
`

export const PageMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  width: 100%;
`

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.02em;
  margin: 0;
`

export const EmptyState = styled.div`
  background: #0f1623;
  border: 1px solid #1e2d45;
  border-radius: 16px;
  padding: 60px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`

export const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 4px;
`

export const EmptyTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0;
`

export const EmptySubtitle = styled.p`
  font-size: 14px;
  color: #4a6080;
  margin: 0;
`
