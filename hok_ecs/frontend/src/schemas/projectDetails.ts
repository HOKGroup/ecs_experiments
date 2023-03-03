import { z } from 'zod';

const projectDetails = z.object({
  project_name: z.string().describe('The Project Name'),
  project_name_alias: z.string().describe('Short name for the project '),
  project_number: z.string().describe('The Project Number'),
  unique_id: z.string().describe('Entity Specific Identifer'),
  admin_location: z.string().describe('Location of the Project from a management perspective '),
});

export default projectDetails;

export type ProjectDetails = z.infer<typeof projectDetails>;
