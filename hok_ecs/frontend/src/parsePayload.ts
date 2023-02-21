import { z } from 'zod';

const specificationMasterDetails = z.object({
  specification_master_name: z.string().optional(),
  master_specialization: z.string().optional(),
  master_owner: z.string().optional(),
});

const scopeOfWorkDetailsSchema = z.object({
  scope_name: z.string().optional(),
  scope_description: z.string().optional(),
  'Scope Criteria': z.array(z.string()).optional(),
});
const jurisdictionDetailsSchema = z.object({
  jurisdiction_name: z.string().optional(),
});

const classificationDetailsSchema = z.object({
  classification_name: z.string().optional(),
  classification_number: z.string().optional(),
  classification_parent_number: z.string().optional(),
  classification_description: z.string().optional(),
});

const personDetailsSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  unique_id: z.string(),
});

const projectGroupSchema = z.object({
  group_name: z.string().optional(),
  group_description: z.string().optional(),
  // FIXME: bad data, should be boolean but is a string in sample data
  close_automatically: z.string().optional(),
  close_date: z.string().optional(),
});

const companyLocationDetailsSchema = z.object({
  location_name: z.string(),
  location_short_name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state_province: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
  telephone: z.string().optional(),
  fax: z.string().optional(),
  unique_id: z.string(),
});

const companyDetailsSchema = z.object({
  company_name: z.string(),
  company_short_name: z.string().optional(),
  unique_id: z.string(),
});

const projectDetailsSchema = z.object({
  project_name: z.string(),
  project_name_alias: z.string(),
  project_number: z.string(),
  unique_id: z.string(),
  admin_location: z.string(),
});

const payloadSchema = z.union([
  scopeOfWorkDetailsSchema,
  jurisdictionDetailsSchema,
  classificationDetailsSchema,
  personDetailsSchema,
  projectGroupSchema,
  companyLocationDetailsSchema,
  companyDetailsSchema,
  projectDetailsSchema,
]);

export type SpecificationMasterDetails = z.infer<
  typeof specificationMasterDetails
>;
export type ScopeOfWorkDetails = z.infer<typeof scopeOfWorkDetailsSchema>;
export type JurisdictionDetails = z.infer<typeof jurisdictionDetailsSchema>;
export type ClassificationDetails = z.infer<typeof classificationDetailsSchema>;
export type ProjectGroup = z.infer<typeof projectGroupSchema>;
export type CompanyLocationDetails = z.infer<
  typeof companyLocationDetailsSchema
>;
export type CompanyDetails = z.infer<typeof companyDetailsSchema>;
export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
export type PersonDetails = z.infer<typeof personDetailsSchema>;

export type Payload = z.infer<typeof payloadSchema>;

//export type Payload<T extends PayloadType> = PayloadMap[T];

export type PayloadType =
  | 'classification.details'
  | 'company.details'
  | 'company.location.details'
  | 'jurisdiction.details'
  | 'person.details'
  | 'project.details'
  | 'project.group'
  | 'specification.master.details'
  | 'service.details';

export interface PayloadMap {
  'classification.details': ClassificationDetails;
  'company.details': CompanyDetails;
  'company.location.details': CompanyLocationDetails;
  'jurisdiction.details': JurisdictionDetails;
  'person.details': PersonDetails;
  'project.details': ProjectDetails;
  'project.group': ProjectGroup;
  'specification.master.details': SpecificationMasterDetails;
  'scopeofwork.details': ScopeOfWorkDetails;
}

// const parsePayload = (payload: string) => {
//   console.log("PAYLOAD: ", payload);
//   // FIXME: use safeParse and handle result union
//   try {
//     const parsed = payloadSchema.parse(JSON.parse(payload));
//     console.log("PARSED: ", parsed);
//     return parsed;
//   } catch (_err) {
//     return {};
//   }
// };

const parsePayload = <T extends keyof PayloadMap>(
  type: T,
  payload: string,
): PayloadMap[T] => {
  const parsedJson: unknown = JSON.parse(payload);

  switch (type) {
    case 'classification.details':
      return classificationDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'jurisdiction.details':
      return jurisdictionDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'scopeofwork.details':
      return scopeOfWorkDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'project.details':
      return projectDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'company.details':
      return companyDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'company.location.details':
      return companyLocationDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'project.group':
      return projectGroupSchema.parse(parsedJson) as PayloadMap[T];
    case 'person.details':
      return personDetailsSchema.parse(parsedJson) as PayloadMap[T];
    case 'specification.master.details':
      return specificationMasterDetails.parse(parsedJson) as PayloadMap[T];
    default:
      // throw new Error("Unknown payload type");
      console.warn('Unknown payload type: ', type);
      return {} as PayloadMap[T];
  }
};

export default parsePayload;
