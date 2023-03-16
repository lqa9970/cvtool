import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import { SetGlobalStyle } from "@nordcloud/gnui";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SetGlobalStyle customScrollbars />
    <App />
  </React.StrictMode>,
)
