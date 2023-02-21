import { z } from 'zod';

const personDetails = z.object({
  first_name: z.string().describe('Persons First Name'),
  last_name: z.string().describe('Persons last Name'),
  email_address: z.string().describe('persons email address'),
  unique_id: z.string().describe('Entity Specific Identifer'),
});

export default personDetails;

export type PersonDetails = z.infer<typeof personDetails>;
