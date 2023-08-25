import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { Store, persistor } from './Redux/store';
import { Provider } from 'react-redux';

// Render the app inside the PersistGate
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="329620575621-v54qd8b32lei37p5f5uh1tcjjbso07ak.apps.googleusercontent.com">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
