import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import Main from './Main'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
