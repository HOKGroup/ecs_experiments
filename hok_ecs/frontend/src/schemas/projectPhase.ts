import { z } from 'zod';

const projectPhase = z.object({
  phase_name: z.string().describe('Phase Name').optional(),
  phase_start: z.string().describe('Phase Start Date ').optional(),
  phase_end: z.string().describe('Phase End Date').optional(),
});

export default projectPhase;

export type ProjectPhase = z.infer<typeof projectPhase>;
