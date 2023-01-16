import { faker as f, faker } from "@faker-js/faker";

import {
  EcsComponent,
  EcsComponentType,
  EcsComponentTypeDetailsMapping,
  EcsEntity,
  EcsItemsToSubmit,
  EcsPersonDetails,
  EcsProjectDetails,
  EcsSpecificationDocumentDetails,
  EcsSubmittalDetails,
  EcsSubmittalRequirements,
  EcsSubmittalResponse,
} from "./types/types";

export function createFakeEntity(): EcsEntity {
  return {
    entityGUID: f.datatype.uuid(),
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
    componentGUID: f.datatype.uuid(),
    context: entity.context,
    entityGUID: entity.entityGUID,
    entityClassification: entity.entityClassification,
    componentUserName: "userName",
    componentUserId: f.datatype.uuid(),
    componentType: componentType,
    componentTypeReference: "typeReference",
    componentVersion: "version",
    componentStatus: "status",
    authorSoftware: "authorSoftware",
    hash1: f.git.commitSha(),
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
    case EcsComponentType.SpecificationDocument:
      return createFakeSpecificationDocumentDetails() as any;
    case EcsComponentType.SubmittalDetails:
      return createFakeSubmittalDetails() as any;
    case EcsComponentType.SubmittalRequirements:
      return createFakeSubmittalRequirements() as any;
    case EcsComponentType.SubmittalResponse:
      return createFakeSubmittalResponse() as any;
  }

  throw new Error("Unhandled component type");
}

export function createFakePersonDetails(): EcsPersonDetails {
  return {
    firstName: f.name.firstName(),
    lastName: f.name.lastName(),
    emailAddress: f.internet.exampleEmail(),
    uniqueId: f.datatype.uuid(),
  };
}

export function createFakeProjectDetails(): EcsProjectDetails {
  return {
    projectName: f.company.bs(),
    projectNameAlias: "projectNameAlias",
    projectNumber: f.datatype.number(),
    uniqueId: f.datatype.uuid(),
    adminLocation: "adminLocation",
  };
}

export function createFakeSpecificationDocumentDetails(): EcsSpecificationDocumentDetails {
  return {
    documentText: f.lorem.lines(10),
  };
}

export function createFakeSubmittalRequirements(): EcsSubmittalRequirements {
  return {
    submittalRequirements: createFakeItemsToSubmit(),
  };
}

export function createFakeItemsToSubmit(
  numItems: number = 5
): EcsItemsToSubmit[] {
  return Array.from({ length: numItems }).map((_i) => {
    const specificationSectionNumber = f.random.numeric(6);
    const sectionName = f.helpers.arrayElement([
      "ACTION SUBMITTALS",
      "INFORMATIONAL SUBMITTALS",
      "QUALITY ASSURANCE",
    ]);

    const itemType = f.helpers.arrayElement(["", "product data"]);

    return {
      specificationSectionName: `${specificationSectionNumber} ${f.commerce.productMaterial()} ${f.commerce.productName()}.pdf`,
      specificationSectionNumber,
      sectionName,
      itemType,
      subSectionNumber: `${f.random.numeric()}.${f.random.numeric()}-${f.random.alpha(
        { casing: "upper" }
      )}`,
      subSectionText: faker.commerce.productDescription(),
    };
  });
}

export function createFakeSubmittalDetails(): EcsSubmittalDetails {
  return {
    submittalName: f.company.bs(),
    submittalNumber: f.datatype.number().toString(),
    submittalDate: "submittalDate",
    submittalDescription: "submittalDescription",
    submittalContents: createFakeSubmittalDetailsContents(),
  };
}

export function createFakeSubmittalDetailsContents(
  numItems: number = 2
): string[] {
  return Array.from({ length: numItems }).map((_i) => "submittalContents");
}

export function createFakeSubmittalResponse(): EcsSubmittalResponse {
  return {
    generalAction: "generalAction",
    description: "description",
    itemAction: [],
    contentArray: [],
  };
}
