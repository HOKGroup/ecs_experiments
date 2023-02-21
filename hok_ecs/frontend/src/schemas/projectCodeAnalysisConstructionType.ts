import { z } from 'zod';

const projectCodeAnalysisConstructionType = z.object({
  code_references: z.string().describe('Applicable code').optional(),
  code_reference_versions: z.string().describe('Code Version').optional(),
  code_section: z.string().describe('Code Section').optional(),
  construction_type: z
    .string()
    .describe('Selected Construction Type')
    .optional(),
  construction_criteria: z.string().describe('Calucation Criteria').optional(),
  construction_criteria_description: z.string().describe('Details').optional(),
});

export default projectCodeAnalysisConstructionType;

export type ProjectCodeAnalysisConstructionType = z.infer<
  typeof projectCodeAnalysisConstructionType
>;
