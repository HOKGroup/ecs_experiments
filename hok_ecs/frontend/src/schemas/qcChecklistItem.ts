import { z } from 'zod';

const qcChecklistItem = z.object({
  checklist_item_name: z.string().describe('Item Name').optional(),
  checklist_item_description: z.string().describe('Description ').optional(),
  'Details of the Review': z
    .array(z.string())
    .describe('List of things that are part of the review item')
    .optional(),
});

export default qcChecklistItem;

export type QcChecklistItem = z.infer<typeof qcChecklistItem>;
