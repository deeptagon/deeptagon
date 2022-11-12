import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './app/shell/AppShell'
import { Router, Web3Provider } from './utils'
import Pages from "./pages"

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { ToastContainer } from 'react-toastify'
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <AppShell>
          <Pages/>
          <ToastContainer autoClose={5000} position="top-left" pauseOnHover />
        </AppShell>
      </Web3Provider>
    </Router>
  </React.StrictMode>
);


serviceWorkerRegistration.register();
