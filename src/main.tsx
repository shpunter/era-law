import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initSendBack } from './features/SendBack/sendBack'

// Wire the laws store -> host bus once, before first render.
initSendBack()

// biome-ignore lint/style/noNonNullAssertion: ok
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
