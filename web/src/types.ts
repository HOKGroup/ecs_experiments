export enum EcsComponentType {
  Person = "person",
  Project = "project",
}
export type EcsComponentDetails = EcsPersonDetails | EcsProjectDetails;

export type EcsComponentTypeMapping = {
  person: EcsPersonDetails;
  project: EcsProjectDetails;
};

export interface EcsEntity {
  entityGUID: string;
  context: string;
  entityClassification: string;
  entityClassificationReference: string;

  components: EcsComponent[];
}

export interface EcsComponent {
  componentGUID: string;
  context: string;
  entityGUID: string;
  entityClassification: string;
  componentUserName: string;
  componentUserId: string;
  componentType: EcsComponentType;
  componentTypeReference: string;
  componentVersion: string;
  componentStatus: string;
  authorSoftware: string;
  hash1: string;
  payloadDataType: string;
  active: string;
  dateCreated: string;

  details: EcsComponentDetails;
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
