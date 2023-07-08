import { z } from 'zod';

const jurisdictionCode = z.object({
  jurisdiction_codes: z.array(z.string()).describe('List of Available Codes').optional(),
});

export default jurisdictionCode;

export type JurisdictionCode = z.infer<typeof jurisdictionCode>;
