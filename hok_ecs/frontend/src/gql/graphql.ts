/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: string;
};

export type Component = {
  __typename?: 'Component';
  componentGuid: Scalars['ID'];
  componentId?: Maybe<Scalars['String']>;
  componentName?: Maybe<Scalars['String']>;
  componentPayloadType?: Maybe<Scalars['String']>;
  componentType?: Maybe<Scalars['String']>;
  componentTypeReference?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  entityGuid: Scalars['ID'];
  owner?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['Json']>;
  status?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
};

export type Entity = {
  __typename?: 'Entity';
  classification?: Maybe<Scalars['String']>;
  classificationReference?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  entityGuid: Scalars['ID'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  componentsByComponentType: Array<Component>;
  entitiesByClassification: Array<Entity>;
};

export type RootQueryTypeComponentsByComponentTypeArgs = {
  componentType: Scalars['String'];
};

export type RootQueryTypeEntitiesByClassificationArgs = {
  classification: Scalars['String'];
};

export type EntitiesByClassificationQueryVariables = Exact<{
  classification: Scalars['String'];
}>;

export type EntitiesByClassificationQuery = {
  __typename?: 'RootQueryType';
  entitiesByClassification: Array<{
    __typename?: 'Entity';
    entityGuid: string;
  }>;
};

export type ComponentsByComponentTypeQueryVariables = Exact<{
  componentType: Scalars['String'];
}>;

export type ComponentsByComponentTypeQuery = {
  __typename?: 'RootQueryType';
  componentsByComponentType: Array<{
    __typename?: 'Component';
    componentGuid: string;
    payload?: string | null;
  }>;
};

export const EntitiesByClassificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EntitiesByClassification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'classification' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'entitiesByClassification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'classification' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'classification' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'entityGuid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EntitiesByClassificationQuery,
  EntitiesByClassificationQueryVariables
>;
export const ComponentsByComponentTypeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ComponentsByComponentType' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'componentType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'componentsByComponentType' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'componentType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'componentType' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'componentGuid' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'payload' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ComponentsByComponentTypeQuery,
  ComponentsByComponentTypeQueryVariables
>;
