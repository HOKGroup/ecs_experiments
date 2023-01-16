import {
  EcsComponentType,
  EcsComponentTypeDetailsMapping,
} from "./ecsComponents";

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

export * from "./ecsComponents";
