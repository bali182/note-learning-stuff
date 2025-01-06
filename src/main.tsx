import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { globalStyles } from './globalStyles'
import { Global } from '@emotion/react'

createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>,
)
