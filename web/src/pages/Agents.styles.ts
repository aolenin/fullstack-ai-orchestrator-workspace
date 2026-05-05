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

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.02em;
  margin: 0;
`

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: #4a6080;
  margin: 4px 0 0;
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4a6080;
  margin: 0 0 16px;
`

export const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const AgentCard = styled.div`
  background: #0f1623;
  border: 1px solid #1e2d45;
  border-radius: 14px;
  padding: 20px;
`

export const AgentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`

export const AgentEmoji = styled.span`
  font-size: 22px;
`

export const AgentName = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0;
`

export const AgentTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const AgentTag = styled.span`
  font-size: 11px;
  background: #151e2e;
  color: #4a6080;
  border: 1px solid #1e2d45;
  border-radius: 6px;
  padding: 3px 8px;
`

export const WorkflowBlock = styled.div`
  margin-top: 24px;
  background: #0f1623;
  border: 1px solid #1e2d45;
  border-radius: 14px;
  padding: 20px 24px;
`

export const WorkflowTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #4a6080;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 14px;
`

export const WorkflowSteps = styled.ol`
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const WorkflowStep = styled.li`
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;

  b {
    color: #3b82f6;
  }
`

export const Section = styled.section`
  margin-top: 24px;
`
