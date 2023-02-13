import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createClient, Provider } from 'urql';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
);
