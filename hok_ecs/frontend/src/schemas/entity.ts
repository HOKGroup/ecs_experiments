import { z } from 'zod';

const entity = z.object({
  entity_guid: z.string().describe('URI or Globally Unique ID'),
  context: z.string().describe('Container location where the data is stored '),
  context_id: z
    .string()
    .describe(
      'Unique Identifier of a context that this data belongs, a project, enterprise, ect. ',
    ),
  entity_classification: z
    .enum([
      'person',
      'project',
      'company',
      'service',
      'submital',
      'rfi',
      'issue',
      'skill',
    ])
    .describe('Classification of the object'),
  entity_classification_reference: z
    .string()
    .describe(
      'reference to the version and location of the defintion of the entity; Can be local or URI etc',
    )
    .optional(),
  creation_date: z
    .string()
    .describe('Date that this version of the entity was created'),
});

export default entity;

export type Entity = z.infer<typeof entity>;
