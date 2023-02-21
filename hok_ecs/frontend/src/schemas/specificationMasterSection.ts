import { z } from 'zod';

const specificationMasterSection = z.object({
  spec: z.array(z.string()).describe('Specification Text').optional(),
});

export default specificationMasterSection;

export type SpecificationMasterSection = z.infer<
  typeof specificationMasterSection
>;
