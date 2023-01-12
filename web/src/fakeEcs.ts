import { faker } from "@faker-js/faker";

import {
  EcsComponent,
  EcsComponentType,
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
    components: [],
  };
}

export function createFakeComponent(
  entity: EcsEntity,
  componentType: EcsComponentType
): EcsComponent {
  const component = {
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

  entity.components.push(component);

  return component;
}

export function createFakeComponentDetails(componentType: EcsComponentType) {
  switch (componentType) {
    case EcsComponentType.Person:
      return createFakePersonDetails();
    case EcsComponentType.Project:
      return createFakeProjectDetails();
  }
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
