import { z } from 'zod';

const jurisdictionDetails = z.object({
  jurisdiction_name: z.string().describe('Name of Jurisdiction').optional(),
});

export default jurisdictionDetails;

export type JurisdictionDetails = z.infer<typeof jurisdictionDetails>;
