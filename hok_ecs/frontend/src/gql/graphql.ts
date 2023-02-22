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
  componentType: Scalars['String'];
  componentTypePayload: Scalars['String'];
  componentTypeReference: Scalars['String'];
  context: Scalars['String'];
  entityClassification?: Maybe<Scalars['String']>;
  entityGuid: Scalars['ID'];
  owner: Scalars['String'];
  payload: Scalars['Json'];
  status?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type Edge = {
  __typename?: 'Edge';
  from: Scalars['ID'];
  to: Scalars['ID'];
};

export type Entity = {
  __typename?: 'Entity';
  classificationReference?: Maybe<Scalars['String']>;
  context: Scalars['String'];
  contextId: Scalars['String'];
  creationDate: Scalars['String'];
  entityClassification: Scalars['String'];
  entityGuid: Scalars['ID'];
};

export type Graph = {
  __typename?: 'Graph';
  edges: Array<Edge>;
  nodes: Array<Node>;
};

export type Node = {
  __typename?: 'Node';
  id: Scalars['ID'];
  label: Scalars['String'];
  type: NodeType;
};

export enum NodeType {
  Component = 'COMPONENT',
  Entity = 'ENTITY',
  Relationship = 'RELATIONSHIP',
}

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
  component?: Maybe<Component>;
  components: Array<Component>;
  entities: Array<Entity>;
  entity?: Maybe<Entity>;
  entityComponentTypes: Array<Scalars['String']>;
  graph: Graph;
  relationship?: Maybe<Relationship>;
};

export type RootQueryTypeComponentArgs = {
  componentGuid: Scalars['ID'];
};

export type RootQueryTypeComponentsArgs = {
  componentType?: InputMaybe<Scalars['String']>;
  entityClassification?: InputMaybe<Scalars['String']>;
  entityGuid?: InputMaybe<Scalars['ID']>;
};

export type RootQueryTypeEntitiesArgs = {
  entityClassification?: InputMaybe<Scalars['String']>;
};

export type RootQueryTypeEntityArgs = {
  entityGuid: Scalars['ID'];
};

export type RootQueryTypeEntityComponentTypesArgs = {
  entityGuid: Scalars['ID'];
};

export type RootQueryTypeRelationshipArgs = {
  relationshipGuid: Scalars['ID'];
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

export type ComponentQueryQueryVariables = Exact<{
  componentGuid: Scalars['ID'];
}>;

export type ComponentQueryQuery = {
  __typename?: 'RootQueryType';
  component?: {
    __typename?: 'Component';
    componentGuid: string;
    entityGuid: string;
    componentName?: string | null;
    componentType: string;
    context: string;
    entityClassification?: string | null;
    status?: string | null;
    payload: string;
  } | null;
};

export type EntityQueryQueryVariables = Exact<{
  entityGuid: Scalars['ID'];
}>;

export type EntityQueryQuery = {
  __typename?: 'RootQueryType';
  entity?: {
    __typename?: 'Entity';
    entityGuid: string;
    entityClassification: string;
    context: string;
    contextId: string;
    classificationReference?: string | null;
  } | null;
};

export type RelationshipQueryQueryVariables = Exact<{
  relationshipGuid: Scalars['ID'];
}>;

export type RelationshipQueryQuery = {
  __typename?: 'RootQueryType';
  relationship?: {
    __typename?: 'Relationship';
    relationshipGuid: string;
    relationshipName?: string | null;
    relationshipType?: string | null;
  } | null;
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

export type GraphQueryVariables = Exact<{ [key: string]: never }>;

export type GraphQuery = {
  __typename?: 'RootQueryType';
  graph: {
    __typename?: 'Graph';
    nodes: Array<{
      __typename?: 'Node';
      id: string;
      label: string;
      title: NodeType;
      group: NodeType;
    }>;
    edges: Array<{ __typename?: 'Edge'; from: string; to: string }>;
  };
};

export type EntitiesQueryQueryVariables = Exact<{
  entityClassification: Scalars['String'];
}>;

export type EntitiesQueryQuery = {
  __typename?: 'RootQueryType';
  entities: Array<{
    __typename?: 'Entity';
    entityGuid: string;
    entityClassification: string;
    context: string;
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
    componentType: string;
    payload: string;
  }>;
};

export type EntityComponentTypesQueryVariables = Exact<{
  entityGuid: Scalars['ID'];
}>;

export type EntityComponentTypesQuery = {
  __typename?: 'RootQueryType';
  entityComponentTypes: Array<string>;
};

export const ComponentQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ComponentQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'componentGuid' },
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
            name: { kind: 'Name', value: 'component' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'componentGuid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'componentGuid' },
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
                  name: { kind: 'Name', value: 'componentName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'componentType' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'context' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'entityClassification' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payload' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ComponentQueryQuery, ComponentQueryQueryVariables>;
export const EntityQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EntityQuery' },
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
            name: { kind: 'Name', value: 'entity' },
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
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'entityGuid' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'entityClassification' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'context' } },
                { kind: 'Field', name: { kind: 'Name', value: 'contextId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'classificationReference' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntityQueryQuery, EntityQueryQueryVariables>;
export const RelationshipQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RelationshipQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'relationshipGuid' },
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
            name: { kind: 'Name', value: 'relationship' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relationshipGuid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'relationshipGuid' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'relationshipGuid' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'relationshipName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'relationshipType' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RelationshipQueryQuery, RelationshipQueryQueryVariables>;
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
} as unknown as DocumentNode<CreateRelationshipMutation, CreateRelationshipMutationVariables>;
export const GraphDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Graph' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'graph' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'title' },
                        name: { kind: 'Name', value: 'type' },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'group' },
                        name: { kind: 'Name', value: 'type' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
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
} as unknown as DocumentNode<GraphQuery, GraphQueryVariables>;
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
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'entities' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'entityClassification' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'entityClassification' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'context' } },
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
} as unknown as DocumentNode<EntityComponentTypesQuery, EntityComponentTypesQueryVariables>;
