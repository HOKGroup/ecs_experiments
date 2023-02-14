import React from 'react';
import ReactDOM from 'react-dom/client';
import { createClient, Provider } from 'urql';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
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
