import { Suspense } from 'react';
import { Footer } from "./Footer"
import { Header } from "./Header"
import "./AppShell.css"
import { Provider } from 'react-redux';
import { store } from '../store';

export const AppShell = ({ children }) => 
  <Provider store={store}>
    <div className="App">
      <Header/>
        <Suspense fallback="loading">
          {children}
        </Suspense>
      <Footer/>
      </div>
    </Provider>