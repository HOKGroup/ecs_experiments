import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { UrqlProvider } from './urqlClient';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <UrqlProvider>
        <App />
      </UrqlProvider>
    </React.StrictMode>,
  );
}
