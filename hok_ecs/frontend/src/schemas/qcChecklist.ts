import { z } from 'zod';

const qcChecklist = z.object({
  checklist_name: z.string().describe('Checklist Name').optional(),
  checklist_description: z
    .string()
    .describe('Checklist Description ')
    .optional(),
});

export default qcChecklist;

export type QcChecklist = z.infer<typeof qcChecklist>;
