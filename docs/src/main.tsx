import './theme.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Docs from './Docs.tsx'

createRoot(document.getElementById('root') as HTMLHtmlElement).render(
  <StrictMode>
    <Docs />
  </StrictMode>
)
