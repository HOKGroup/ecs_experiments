import { z } from 'zod';

const scopeofworkDetails = z.object({
  scope_name: z.string().describe('Scope of Work Name').optional(),
  scope_description: z.string().describe('Scope of Work Description').optional(),
  'Scope Criteria': z.array(z.string()).describe('Key Requirments of the Scope').optional(),
});

export default scopeofworkDetails;

export type ScopeofworkDetails = z.infer<typeof scopeofworkDetails>;
