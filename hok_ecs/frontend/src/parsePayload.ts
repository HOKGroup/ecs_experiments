import { z } from 'zod';

const personDetailsSchema = z.object({
  FirstName: z.string(),
  LastName: z.string(),
  EmailAddress: z.string(),
});

const projectGroupSchema = z.object({
  GroupName: z.string(),
  UniqueID: z.string(),
});

const serviceDetailsSchema = z.object({
  ServiceName: z.string(),
  ServiceAcronym: z.string(),
  BaseURL: z.string(),
});

const companyLocationDetailsSchema = z.object({
  LocationName: z.string(),
  LocationAlias: z.string(),
});

const companyDetailsSchema = z.object({
  CompanyName: z.string(),
  CompanyAcronym: z.string(),
});

const projectDetailsSchema = z.object({
  ProjectName: z.string(),
  ProjectNumber: z.string(),
  ProjectNameAlias: z.string(),
});

const payloadSchema = z.union([
  personDetailsSchema,
  projectGroupSchema,
  serviceDetailsSchema,
  companyLocationDetailsSchema,
  companyDetailsSchema,
  projectDetailsSchema,
]);

export type ProjectGroup = z.infer<typeof projectGroupSchema>;
export type ServiceDetails = z.infer<typeof serviceDetailsSchema>;
export type CompanyLocationDetails = z.infer<
  typeof companyLocationDetailsSchema
>;
export type CompanyDetails = z.infer<typeof companyDetailsSchema>;
export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
export type PersonDetails = z.infer<typeof personDetailsSchema>;

export type Payload = z.infer<typeof payloadSchema>;

//export type Payload<T extends PayloadType> = PayloadMap[T];

export type PayloadType =
  | 'project.details'
  | 'service.details'
  | 'company.details'
  | 'company.location.details'
  | 'service.details'
  | 'project.group'
  | 'person.details';

// export interface PayloadMap {
//   "project.details": ProjectDetails,
//   "service.details": ServiceDetails,
//   "company.details": CompanyDetails,
//   "company.location.details": CompanyLocationDetails,
//   "project.group": ProjectGroup,
//   "person.details": PersonDetails,
//   "entity": undefined
// }

const parsePayload = (payload: string) => {
  // FIXME: use safeParse and handle result union
  try {
    return payloadSchema.parse(JSON.parse(payload));
  } catch (_err) {
    return {};
  }
};

// const parsePayload = <T extends PayloadType>(type: T, payload: string): PayloadMap[T] => {
//   switch(type) {
//     case "project.details":
//       return projectDetailsSchema.parse(payload) as PayloadMap[T];
//     case "service.details":
//       return serviceDetailsSchema.parse(payload) as PayloadMap[T];
//     case "company.details":
//       return companyDetailsSchema.parse(payload) as PayloadMap[T];
//     case "company.location.details":
//       return companyLocationDetailsSchema.parse(payload) as PayloadMap[T];
//     case "project.group":
//       return projectGroupSchema.parse(payload) as PayloadMap[T];
//     case "person.details":
//       return personDetailsSchema.parse(payload) as PayloadMap[T];
//     default:
//       throw new Error("Unknown payload type");
//   }
// }

export default parsePayload;
