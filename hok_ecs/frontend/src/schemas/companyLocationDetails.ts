import { z } from 'zod';

const companyLocationDetails = z.object({
  location_name: z.string().describe('Company Location Name'),
  location_short_name: z
    .string()
    .describe('Abbreviation or short name for company location')
    .optional(),
  address1: z.string().describe('First Address Line').optional(),
  address2: z.string().describe('Second Address Line').optional(),
  city: z.string().describe('City').optional(),
  state_province: z.string().describe('State for province').optional(),
  country: z.string().describe('Country').optional(),
  postal_code: z.string().describe('Postal Code').optional(),
  telephone: z.string().describe('Telephone for location').optional(),
  fax: z.string().describe('Fax for location').optional(),
  unique_id: z.string().describe('Company Location Unique ID'),
});

export default companyLocationDetails;

export type CompanyLocationDetails = z.infer<typeof companyLocationDetails>;
