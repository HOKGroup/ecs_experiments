import { z } from 'zod';

const classificationDetails = z.object({
  classification_name: z.string().describe('Classification Name').optional(),
  classification_number: z
    .string()
    .describe('Classification Number')
    .optional(),
  classification_parent_number: z
    .string()
    .describe('Classification Parent Number')
    .optional(),
  classification_description: z
    .string()
    .describe('Classification Description')
    .optional(),
});

export default classificationDetails;

export type ClassificationDetails = z.infer<typeof classificationDetails>;
