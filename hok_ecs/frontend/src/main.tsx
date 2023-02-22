import { refocusExchange } from '@urql/exchange-refocus';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [dedupExchange, refocusExchange(), cacheExchange, fetchExchange],
});

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider value={client}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
