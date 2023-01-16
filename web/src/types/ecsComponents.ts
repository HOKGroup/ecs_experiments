import { EcsPersonDetails } from "./ecsComponents/person";
import { EcsProjectDetails } from "./ecsComponents/project";
import { EcsSpecificationDocumentDetails } from "./ecsComponents/specificationDocument";
import { EcsSubmittalDetails } from "./ecsComponents/submittalDetails";
import { EcsSubmittalRequirements } from "./ecsComponents/submittalRequirements";
import { EcsSubmittalResponse } from "./ecsComponents/submittalResponse";

export enum EcsComponentType {
  Person = "person",
  Project = "project",
  SpecificationDocument = "specificationDocument",
  SubmittalRequirements = "submittalRequirements",
  SubmittalDetails = "submittalDetails",
  SubmittalResponse = "submittalResponse",
}

export interface EcsComponentTypeDetailsMapping {
  [EcsComponentType.Person]: EcsPersonDetails;
  [EcsComponentType.Project]: EcsProjectDetails;
  [EcsComponentType.SpecificationDocument]: EcsSpecificationDocumentDetails;
  [EcsComponentType.SubmittalRequirements]: EcsSubmittalRequirements;
  [EcsComponentType.SubmittalDetails]: EcsSubmittalDetails;
  [EcsComponentType.SubmittalResponse]: EcsSubmittalResponse;
}

export * from "./ecsComponents/person";
export * from "./ecsComponents/project";
export * from "./ecsComponents/specificationDocument";
export * from "./ecsComponents/submittalDetails";
export * from "./ecsComponents/submittalRequirements";
export * from "./ecsComponents/submittalResponse";
