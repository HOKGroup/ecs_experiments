/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n  query ComponentQuery($componentGuid: ID!) {\n    component(componentGuid: $componentGuid) {\n      componentGuid\n      entityGuid\n      componentName\n      componentType\n      context\n      entityClassification\n      status\n      payload\n    }\n  }\n':
    types.ComponentQueryDocument,
  '\n  query EntityQuery($entityGuid: ID!) {\n    entity(entityGuid: $entityGuid) {\n      entityGuid\n      entityClassification\n      context\n      contextId\n      classificationReference\n    }\n  }\n':
    types.EntityQueryDocument,
  '\n  query RelationshipQuery($relationshipGuid: ID!) {\n    relationship(relationshipGuid: $relationshipGuid) {\n      relationshipGuid\n      relationshipName\n      relationshipType\n    }\n  }\n':
    types.RelationshipQueryDocument,
  '\n  mutation CreateRelationship(\n    $relationshipType: String\n    $sourceEntityGuids: [ID!]\n    $sourceComponentGuids: [ID!]\n    $destinationEntityGuids: [ID!]\n    $destinationComponentGuids: [ID!]\n  ) {\n    createRelationship(\n      relationshipType: $relationshipType\n      sourceEntityGuids: $sourceEntityGuids\n      sourceComponentGuids: $sourceComponentGuids\n      destinationEntityGuids: $destinationEntityGuids\n      destinationComponentGuids: $destinationComponentGuids\n    ) {\n      successful\n      result {\n        relationshipGuid\n      }\n    }\n  }\n':
    types.CreateRelationshipDocument,
  '\n  query Graph {\n    graph {\n      nodes {\n        id\n        label\n        title: type\n        group: type\n      }\n      edges {\n        from\n        to\n      }\n    }\n  }\n':
    types.GraphDocument,
  '\n  query EntitiesQuery($entityClassification: String!) {\n    entities(entityClassification: $entityClassification) {\n      entityGuid\n      entityClassification\n      context\n    }\n  }\n':
    types.EntitiesQueryDocument,
  '\n  query ComponentsByComponentType($componentType: String!, $entityGuid: ID) {\n    components(componentType: $componentType, entityGuid: $entityGuid) {\n      componentGuid\n      entityGuid\n      componentType\n      payload\n    }\n  }\n':
    types.ComponentsByComponentTypeDocument,
  '\n  query EntityComponentTypes($entityGuid: ID!) {\n    entityComponentTypes(entityGuid: $entityGuid)\n  }\n':
    types.EntityComponentTypesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ComponentQuery($componentGuid: ID!) {\n    component(componentGuid: $componentGuid) {\n      componentGuid\n      entityGuid\n      componentName\n      componentType\n      context\n      entityClassification\n      status\n      payload\n    }\n  }\n',
): (typeof documents)['\n  query ComponentQuery($componentGuid: ID!) {\n    component(componentGuid: $componentGuid) {\n      componentGuid\n      entityGuid\n      componentName\n      componentType\n      context\n      entityClassification\n      status\n      payload\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query EntityQuery($entityGuid: ID!) {\n    entity(entityGuid: $entityGuid) {\n      entityGuid\n      entityClassification\n      context\n      contextId\n      classificationReference\n    }\n  }\n',
): (typeof documents)['\n  query EntityQuery($entityGuid: ID!) {\n    entity(entityGuid: $entityGuid) {\n      entityGuid\n      entityClassification\n      context\n      contextId\n      classificationReference\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RelationshipQuery($relationshipGuid: ID!) {\n    relationship(relationshipGuid: $relationshipGuid) {\n      relationshipGuid\n      relationshipName\n      relationshipType\n    }\n  }\n',
): (typeof documents)['\n  query RelationshipQuery($relationshipGuid: ID!) {\n    relationship(relationshipGuid: $relationshipGuid) {\n      relationshipGuid\n      relationshipName\n      relationshipType\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateRelationship(\n    $relationshipType: String\n    $sourceEntityGuids: [ID!]\n    $sourceComponentGuids: [ID!]\n    $destinationEntityGuids: [ID!]\n    $destinationComponentGuids: [ID!]\n  ) {\n    createRelationship(\n      relationshipType: $relationshipType\n      sourceEntityGuids: $sourceEntityGuids\n      sourceComponentGuids: $sourceComponentGuids\n      destinationEntityGuids: $destinationEntityGuids\n      destinationComponentGuids: $destinationComponentGuids\n    ) {\n      successful\n      result {\n        relationshipGuid\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateRelationship(\n    $relationshipType: String\n    $sourceEntityGuids: [ID!]\n    $sourceComponentGuids: [ID!]\n    $destinationEntityGuids: [ID!]\n    $destinationComponentGuids: [ID!]\n  ) {\n    createRelationship(\n      relationshipType: $relationshipType\n      sourceEntityGuids: $sourceEntityGuids\n      sourceComponentGuids: $sourceComponentGuids\n      destinationEntityGuids: $destinationEntityGuids\n      destinationComponentGuids: $destinationComponentGuids\n    ) {\n      successful\n      result {\n        relationshipGuid\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Graph {\n    graph {\n      nodes {\n        id\n        label\n        title: type\n        group: type\n      }\n      edges {\n        from\n        to\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Graph {\n    graph {\n      nodes {\n        id\n        label\n        title: type\n        group: type\n      }\n      edges {\n        from\n        to\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query EntitiesQuery($entityClassification: String!) {\n    entities(entityClassification: $entityClassification) {\n      entityGuid\n      entityClassification\n      context\n    }\n  }\n',
): (typeof documents)['\n  query EntitiesQuery($entityClassification: String!) {\n    entities(entityClassification: $entityClassification) {\n      entityGuid\n      entityClassification\n      context\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ComponentsByComponentType($componentType: String!, $entityGuid: ID) {\n    components(componentType: $componentType, entityGuid: $entityGuid) {\n      componentGuid\n      entityGuid\n      componentType\n      payload\n    }\n  }\n',
): (typeof documents)['\n  query ComponentsByComponentType($componentType: String!, $entityGuid: ID) {\n    components(componentType: $componentType, entityGuid: $entityGuid) {\n      componentGuid\n      entityGuid\n      componentType\n      payload\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query EntityComponentTypes($entityGuid: ID!) {\n    entityComponentTypes(entityGuid: $entityGuid)\n  }\n',
): (typeof documents)['\n  query EntityComponentTypes($entityGuid: ID!) {\n    entityComponentTypes(entityGuid: $entityGuid)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
