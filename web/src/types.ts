export enum EcsComponentType {
  Person = "person",
  Project = "project",
}

export interface EcsComponentTypeDetailsMapping {
  [EcsComponentType.Person]: EcsPersonDetails;
  [EcsComponentType.Project]: EcsProjectDetails;
}

export type EcsEntityComponents = {
  [T in EcsComponentType]?: EcsComponent<T>;
};

export interface EcsEntity {
  entityGUID: string;
  context: string;
  entityClassification: string;
  entityClassificationReference: string;

  components: EcsEntityComponents;
}

export interface EcsComponent<T extends EcsComponentType> {
  componentGUID: string;
  context: string;
  entityGUID: string;
  entityClassification: string;
  componentUserName: string;
  componentUserId: string;
  componentTypeReference: string;
  componentVersion: string;
  componentStatus: string;
  authorSoftware: string;
  hash1: string;
  payloadDataType: string;
  active: string;
  dateCreated: string;

  componentType: T;
  details: EcsComponentTypeDetailsMapping[T];
}

export interface EcsPersonDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  uniqueId: string;
}

export interface EcsProjectDetails {
  projectName: string;
  projectNameAlias: string;
  projectNumber: number;
  uniqueId: string;
  adminLocation: string;
}
