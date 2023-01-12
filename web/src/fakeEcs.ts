import { faker } from "@faker-js/faker";

import {
  EcsComponent,
  EcsComponentType,
  EcsComponentTypeDetailsMapping,
  EcsEntity,
  EcsPersonDetails,
  EcsProjectDetails,
} from "./types";

export function createFakeEntity(): EcsEntity {
  return {
    entityGUID: faker.datatype.uuid(),
    context: "context",
    entityClassification: "classification",
    entityClassificationReference: "classificationReference",
    components: {},
  };
}

export function createFakeComponent<T extends EcsComponentType>(
  entity: EcsEntity,
  componentType: T
): EcsComponent<T> {
  const component: EcsComponent<T> = {
    componentGUID: faker.datatype.uuid(),
    context: entity.context,
    entityGUID: entity.entityGUID,
    entityClassification: entity.entityClassification,
    componentUserName: "userName",
    componentUserId: faker.datatype.uuid(),
    componentType: componentType,
    componentTypeReference: "typeReference",
    componentVersion: "version",
    componentStatus: "status",
    authorSoftware: "authorSoftware",
    hash1: faker.git.commitSha(),
    payloadDataType: "payloadDataType",
    active: "active",
    dateCreated: "dateCreated",
    details: createFakeComponentDetails(componentType),
  };

  (entity.components[componentType] as EcsComponent<T>) = component;

  return component;
}

export function createFakeComponentDetails<T extends EcsComponentType>(
  componentType: T
): EcsComponentTypeDetailsMapping[T] {
  switch (componentType) {
    case EcsComponentType.Person:
      return createFakePersonDetails() as any;
    case EcsComponentType.Project:
      return createFakeProjectDetails() as any;
  }

  throw new Error("Unknown component type");
}

export function createFakePersonDetails(): EcsPersonDetails {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.exampleEmail(),
    uniqueId: faker.datatype.uuid(),
  };
}

export function createFakeProjectDetails(): EcsProjectDetails {
  return {
    projectName: faker.company.bs(),
    projectNameAlias: "projectNameAlias",
    projectNumber: faker.datatype.number(),
    uniqueId: faker.datatype.uuid(),
    adminLocation: "adminLocation",
  };
}
