import { z } from 'zod';

const projectGroup = z.object({
  group_name: z.string().describe('Group Name').optional(),
  group_description: z.string().describe('Group Description').optional(),
  close_automatically: z.boolean().describe('Should this group be closed Automatically').optional(),
  close_date: z.string().describe('Date that this group will deactivate itself').optional(),
});

export default projectGroup;

export type ProjectGroup = z.infer<typeof projectGroup>;
