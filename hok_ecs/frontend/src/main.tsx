import { refocusExchange } from '@urql/exchange-refocus';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import App from './App';
import schema from './gql/introspection.json';
import customScalarsExchange from 'urql-custom-scalars-exchange';
import './index.scss';
import { IntrospectionQuery } from 'graphql';

const scalarsExchange = customScalarsExchange({
  schema: schema as unknown as IntrospectionQuery,
  scalars: {
    Json(value: unknown) {
      const parsed = JSON.parse(value as string) as unknown;
      return parsed;
    },
  },
});

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [dedupExchange, refocusExchange(), scalarsExchange, cacheExchange, fetchExchange],
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
