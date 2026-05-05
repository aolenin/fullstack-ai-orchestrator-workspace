import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; background: #080c14; color: #e2e8f0; }
`
