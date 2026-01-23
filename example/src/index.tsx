import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import Example from './Example'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Example />
  </StrictMode>
)
