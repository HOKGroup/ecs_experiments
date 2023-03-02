import React, { ReactNode } from 'react';
import customScalarsExchange from 'urql-custom-scalars-exchange';
import schema from './gql/introspection.json';
import { IntrospectionQuery } from 'graphql';
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { refocusExchange } from '@urql/exchange-refocus';
import { devtoolsExchange } from '@urql/devtools';

const scalarsExchange = customScalarsExchange({
  schema: schema as unknown as IntrospectionQuery,
  scalars: {
    Json(value: unknown) {
      if (typeof value === 'string') {
        const parsed = JSON.parse(value) as unknown;
        return parsed;
      } else {
        // Value from cache, don't re-parse
        return value;
      }
    },
  },
});

const client = createClient({
  url: '/api/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    refocusExchange(),
    scalarsExchange,
    cacheExchange,
    fetchExchange,
  ],
});

export default client;

export const UrqlProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
