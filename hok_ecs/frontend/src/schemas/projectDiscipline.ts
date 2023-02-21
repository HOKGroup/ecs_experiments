import { z } from 'zod';

const projectDiscipline = z.object({
  discipline: z
    .enum([
      'Architecture',
      'Structural Engineering',
      'Building Services',
      'HVAC Engineering',
      'Plumbing Engineering',
      'Electrical Engineering',
      'Fire Protection',
      '*',
    ])
    .describe('Discipline on the project')
    .optional(),
});

export default projectDiscipline;

export type ProjectDiscipline = z.infer<typeof projectDiscipline>;
