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
  entityClassification?: Maybe<Scalars['String']>;
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

export type Relationship = {
  __typename?: 'Relationship';
  relationshipGuid: Scalars['ID'];
  relationshipName?: Maybe<Scalars['String']>;
  relationshipType?: Maybe<Scalars['String']>;
};

export type RelationshipPayload = {
  __typename?: 'RelationshipPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Relationship>;
  /** Indicates if the mutation completed successfully or not. */
  successful: Scalars['Boolean'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createRelationship: RelationshipPayload;
};

export type RootMutationTypeCreateRelationshipArgs = {
  destinationComponentGuids?: InputMaybe<Array<Scalars['ID']>>;
  destinationEntityGuids?: InputMaybe<Array<Scalars['ID']>>;
  relationshipType?: InputMaybe<Scalars['String']>;
  sourceComponentGuids?: InputMaybe<Array<Scalars['ID']>>;
  sourceEntityGuids?: InputMaybe<Array<Scalars['ID']>>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  components: Array<Component>;
  entities: Array<Entity>;
  entityComponentTypes: Array<Scalars['String']>;
};

export type RootQueryTypeComponentsArgs = {
  componentType?: InputMaybe<Scalars['String']>;
  entityClassification?: InputMaybe<Scalars['String']>;
  entityGuid?: InputMaybe<Scalars['ID']>;
};

export type RootQueryTypeEntitiesArgs = {
  classification?: InputMaybe<Scalars['String']>;
};

export type RootQueryTypeEntityComponentTypesArgs = {
  entityGuid: Scalars['ID'];
};

/**
 * Validation messages are returned when mutation input does not meet the requirements.
 *   While client-side validation is highly recommended to provide the best User Experience,
 *   All inputs will always be validated server-side.
 *
 *   Some examples of validations are:
 *
 *   * Username must be at least 10 characters
 *   * Email field does not contain an email address
 *   * Birth Date is required
 *
 *   While GraphQL has support for required values, mutation data fields are always
 *   set to optional in our API. This allows 'required field' messages
 *   to be returned in the same manner as other validations. The only exceptions
 *   are id fields, which may be required to perform updates or deletes.
 */
export type ValidationMessage = {
  __typename?: 'ValidationMessage';
  /** A unique error code for the type of validation used. */
  code: Scalars['String'];
  /**
   * The input field that the error applies to. The field can be used to
   * identify which field the error message should be displayed next to in the
   * presentation layer.
   *
   * If there are multiple errors to display for a field, multiple validation
   * messages will be in the result.
   *
   * This field may be null in cases where an error cannot be applied to a specific field.
   */
  field?: Maybe<Scalars['String']>;
  /**
   * A friendly error message, appropriate for display to the end user.
   *
   * The message is interpolated to include the appropriate variables.
   *
   * Example: `Username must be at least 10 characters`
   *
   * This message may change without notice, so we do not recommend you match against the text.
   * Instead, use the *code* field for matching.
   */
  message?: Maybe<Scalars['String']>;
  /** A list of substitutions to be applied to a validation message template */
  options?: Maybe<Array<Maybe<ValidationOption>>>;
  /**
   * A template used to generate the error message, with placeholders for option substiution.
   *
   * Example: `Username must be at least {count} characters`
   *
   * This message may change without notice, so we do not recommend you match against the text.
   * Instead, use the *code* field for matching.
   */
  template?: Maybe<Scalars['String']>;
};

export type ValidationOption = {
  __typename?: 'ValidationOption';
  /** The name of a variable to be subsituted in a validation message template */
  key: Scalars['String'];
  /** The value of a variable to be substituted in a validation message template */
  value: Scalars['String'];
};

export type EntitiesQueryQueryVariables = Exact<{
  entityClassification: Scalars['String'];
  componentType: Scalars['String'];
}>;

export type EntitiesQueryQuery = {
  __typename?: 'RootQueryType';
  components: Array<{
    __typename?: 'Component';
    entityGuid: string;
    entityClassification?: string | null;
    componentType?: string | null;
    payload?: string | null;
  }>;
};

export type ComponentsByComponentTypeQueryVariables = Exact<{
  componentType: Scalars['String'];
  entityGuid?: InputMaybe<Scalars['ID']>;
}>;

export type ComponentsByComponentTypeQuery = {
  __typename?: 'RootQueryType';
  components: Array<{
    __typename?: 'Component';
    componentGuid: string;
    entityGuid: string;
    componentType?: string | null;
    payload?: string | null;
  }>;
};

export type EntityComponentTypesQueryVariables = Exact<{
  entityGuid: Scalars['ID'];
}>;

export type EntityComponentTypesQuery = {
  __typename?: 'RootQueryType';
  entityComponentTypes: Array<string>;
};

export type CreateRelationshipMutationVariables = Exact<{
  relationshipType?: InputMaybe<Scalars['String']>;
  sourceEntityGuids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  sourceComponentGuids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  destinationEntityGuids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  destinationComponentGuids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type CreateRelationshipMutation = {
  __typename?: 'RootMutationType';
  createRelationship: {
    __typename?: 'RelationshipPayload';
    successful: boolean;
    result?: { __typename?: 'Relationship'; relationshipGuid: string } | null;
  };
};

export const EntitiesQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EntitiesQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'entityClassification' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
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
            name: { kind: 'Name', value: 'components' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'entityClassification' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'entityClassification' },
                },
              },
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
                { kind: 'Field', name: { kind: 'Name', value: 'entityGuid' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'entityClassification' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'componentType' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'payload' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntitiesQueryQuery, EntitiesQueryQueryVariables>;
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'entityGuid' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'components' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'componentType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'componentType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'entityGuid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'entityGuid' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'entityGuid' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'componentType' },
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
export const EntityComponentTypesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EntityComponentTypes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'entityGuid' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'entityComponentTypes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'entityGuid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'entityGuid' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EntityComponentTypesQuery,
  EntityComponentTypesQueryVariables
>;
export const CreateRelationshipDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateRelationship' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'relationshipType' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sourceEntityGuids' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sourceComponentGuids' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'destinationEntityGuids' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'destinationComponentGuids' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createRelationship' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relationshipType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'relationshipType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sourceEntityGuids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sourceEntityGuids' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sourceComponentGuids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sourceComponentGuids' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'destinationEntityGuids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'destinationEntityGuids' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'destinationComponentGuids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'destinationComponentGuids' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'successful' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'relationshipGuid' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateRelationshipMutation,
  CreateRelationshipMutationVariables
>;
