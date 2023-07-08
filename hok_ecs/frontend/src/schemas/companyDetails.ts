import { z } from 'zod';

const companyDetails = z.object({
  company_name: z.string().describe('Company Name'),
  company_short_name: z.string().describe('Abbreviation or short name for company').optional(),
  unique_id: z.string().describe('Company Unique ID'),
});

export default companyDetails;

export type CompanyDetails = z.infer<typeof companyDetails>;
