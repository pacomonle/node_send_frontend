import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';
import '../styles/globals.css';

// archivo ppal mas alto de la app
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>

  )
}

export default MyApp
