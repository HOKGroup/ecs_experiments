import React, { ReactNode } from 'react';
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { refocusExchange } from '@urql/exchange-refocus';
import { devtoolsExchange } from '@urql/devtools';

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [devtoolsExchange, dedupExchange, refocusExchange(), cacheExchange, fetchExchange],
});

export default client;

export const UrqlProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
