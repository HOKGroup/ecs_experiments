import React, { ReactNode } from 'react';
import customScalarsExchange from 'urql-custom-scalars-exchange';
import schema from './gql/introspection.json';
import { IntrospectionQuery } from 'graphql';
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { refocusExchange } from '@urql/exchange-refocus';

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

export default client;

export const UrqlProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
