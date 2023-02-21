import { z } from 'zod';

const component = z.object({
  component_guid: z.string().describe('URI or Globally Unique ID'),
  component_sequence_name: z
    .string()
    .describe(
      'For Components that have a sequence to them, like documents or other data this is where the definition name is stored',
    )
    .optional(),
  component_sequence_value: z
    .string()
    .describe(
      'For Components that have a sequence this is where the sequence value is stored... 001, 002, A, B C...',
    )
    .optional(),
  context: z.string().describe('Container location where the data is stored '),
  context_id: z
    .string()
    .describe(
      'Unique Identifier of a context that this data belongs, a project, enterprise, ect. ',
    ),
  component_name: z
    .string()
    .describe('User Name for the component ')
    .optional(),
  component_id: z
    .string()
    .describe('User number for the component ')
    .optional(),
  entity_guid: z.string().describe('GUID of parent entity'),
  entity_classification: z
    .string()
    .describe('Classification of parent entity')
    .optional(),
  component_type: z
    .enum([
      'person.details',
      'person.project.add',
      'classification.details',
      'company.details',
      'company.location.details',
      'company.location.point',
      'company.serviceoffering.details',
      'project.code.analysis.details',
      'project.code.analysis.construction.type',
      'project.details',
      'project.phase',
      'project.package',
      'project.deliverable',
      'project.deliverable.item',
      'project.discipline',
      'project.location.details',
      'project.code.analysis',
      'project.performance.benchmark',
      'project.performance.detail',
      'project.performance.item',
      'project.qc.review',
      'jurisdiction.code',
      'jurisdiction.details',
      'project.group',
      'person.group',
      'task.group',
      'company.group',
      'project.location.polygon',
      'service.admin.details',
      'scopeofwork.details',
      'specification.master.details',
      'specification.master.section',
      'qc.checklist',
      'qc.checklist.item',
    ])
    .describe(
      'Definition of component; Like Person.Details, Specification.Document, Submital.Responce, etc',
    ),
  component_type_reference: z
    .string()
    .describe(
      'reference to the version and location of the defintion of the component_type; Can be local or URI etc',
    ),
  component_type_payload: z
    .enum([
      'json',
      'json-ld',
      'geojson',
      'step',
      'ifc',
      'dwg',
      'gltf',
      'obj',
      'image',
      'word',
      'blob',
    ])
    .describe(
      'what is the expected encododing of the data in the component payload.  json,geojson,gltf, object, 3dm, rvt, ifc etc',
    ),
  owner: z
    .enum(['HOK', 'SomeCompany'])
    .describe('The user or entity that is the owner of this component'),
  version: z
    .enum(['V.00001', 'V.00002', 'V.00003'])
    .describe('The version of this component'),
  status: z
    .enum(['For Client Review', 'For Internal Review', 'Option 2'])
    .describe('User define value for nature of component')
    .optional(),
  active: z.boolean().describe('Is the component a valid, active component'),
  creation_date: z
    .string()
    .describe('Date that this version of the component was created'),
  authoring_application: z
    .enum(['Trajecotory', 'Spec Tool', 'Simple BIM App', 'other'])
    .describe('Application that generated the component')
    .optional(),
  hash1: z
    .string()
    .describe('Hash of potentially many that is used to validate the object')
    .optional(),
  payload: z.record(z.any()).describe('Payload of the component'),
});

export default component;

export type Component = z.infer<typeof component>;
