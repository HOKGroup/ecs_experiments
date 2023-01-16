export interface EcsSubmittalRequirements {
  submittalRequirements: EcsItemsToSubmit[];
}

export interface EcsItemsToSubmit {
  specificationSectionName: string;
  specificationSectionNumber: string;
  sectionName: string;
  itemType: string;
  subSectionNumber: string;
  subSectionText: string;
}
