import React from 'react';
import AuthState from '../context/auth/authState';
import '../styles/globals.css'

// archivo ppal mas alto de la app
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>

        <Component {...pageProps} />

    </AuthState>

  )
}

export default MyApp
