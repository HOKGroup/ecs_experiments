import { z } from 'zod';

const projectCodeAnalysisDetails = z.object({
  controlling_codes: z
    .array(z.string())
    .describe('List of Codes that Control on the Project')
    .optional(),
  code_analysis_summary: z
    .string()
    .describe('Written Description of How the Code is applied on the project')
    .optional(),
});

export default projectCodeAnalysisDetails;

export type ProjectCodeAnalysisDetails = z.infer<
  typeof projectCodeAnalysisDetails
>;
