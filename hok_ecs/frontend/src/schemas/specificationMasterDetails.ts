import { z } from 'zod';

const specificationMasterDetails = z.object({
  specification_master_name: z
    .string()
    .describe('Name of the Master')
    .optional(),
  master_specialization: z
    .string()
    .describe('Market or Other Reason for the Master ')
    .optional(),
  master_owner: z.string().describe('Person generating the master').optional(),
});

export default specificationMasterDetails;

export type SpecificationMasterDetails = z.infer<
  typeof specificationMasterDetails
>;
