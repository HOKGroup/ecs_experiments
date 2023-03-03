import { ColumnDef } from '@tanstack/react-table';
import { SpecificationMasterDetails } from '../../schemas/specificationMasterDetails';
import { ProjectDetails } from '../../schemas/projectDetails';
import { CompanyDetails } from '../../schemas/companyDetails';
import { CompanyLocationDetails } from '../../schemas/companyLocationDetails';
import { ProjectGroup } from '../../schemas/projectGroup';
import { PersonDetails } from '../../schemas/personDetails';
import { ClassificationDetails } from '../../schemas/classificationDetails';
import { ScopeofworkDetails } from '../../schemas/scopeofworkDetails';
import { JurisdictionDetails } from '../../schemas/jurisdictionDetails';
import { ProjectCodeAnalysisConstructionType } from '../../schemas/projectCodeAnalysisConstructionType';
import { ProjectCodeAnalysisDetails } from '../../schemas/projectCodeAnalysisDetails';
import { ProjectDiscipline } from '../../schemas/projectDiscipline';
import { ProjectLocationDetails } from '../../schemas/projectLocationDetails';
import { ProjectPhase } from '../../schemas/projectPhase';
import { QcChecklist } from '../../schemas/qcChecklist';
import { QcChecklistItem } from '../../schemas/qcChecklistItem';
import { EntityOrComponentType } from '../CreateRelationship';
import { type ComponentData, type EntityData, type Data } from './EntityOrComponentDataTable';

const getColumns = (entityOrComponentType: EntityOrComponentType) => {
  if (entityOrComponentType.type === 'entity') {
    return getEntityColumns();
  }
  return getComponentColumns(entityOrComponentType.componentType) as ColumnDef<Data>[];
};

const getEntityColumns = (): ColumnDef<EntityData>[] => {
  return [
    {
      header: 'Context',
      id: 'LABEL',
      accessorKey: 'context',
    },
  ];
};

const getComponentColumns = (componentType: string): ColumnDef<ComponentData>[] => {
  const columns: ColumnDef<ComponentData>[] = [
    {
      header: 'GUID',
      id: 'LABEL',
      accessorKey: 'componentGuid',
    },
  ];

  switch (componentType) {
    case 'project.details': {
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as ProjectDetails).project_name,
        },
        {
          header: 'Number',
          accessorFn: (c) => (c.payload as ProjectDetails).project_number,
        },
        {
          header: 'Alias',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDetails).project_name_alias,
        },
      ];
    }
    case 'company.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyDetails).company_name,
        },
        {
          header: 'Short Name',
          accessorFn: (c) => (c.payload as CompanyDetails).company_short_name,
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).location_name,
        },
        {
          header: 'Alias',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).location_short_name,
        },
      ];
    case 'project.location.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectLocationDetails).location_name,
        },
        {
          header: 'Legal Description',
          accessorFn: (c) => (c.payload as ProjectLocationDetails).legal_description,
        },
      ];
    case 'project.phase':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectPhase).phase_name,
        },
        {
          header: 'Start Date',
          accessorFn: (c) => (c.payload as ProjectPhase).phase_start,
        },
        {
          header: 'End Date',
          accessorFn: (c) => (c.payload as ProjectPhase).phase_end,
        },
      ];
    case 'qc.checklist':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as QcChecklist).checklist_name,
        },
        {
          header: 'Description',
          accessorFn: (c) => (c.payload as QcChecklist).checklist_description,
        },
      ];
    case 'qc.checklist.item':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as QcChecklistItem).checklist_item_name,
        },
        {
          header: 'Description',
          accessorFn: (c) => (c.payload as QcChecklistItem).checklist_item_description,
        },
      ];
    case 'project.group':
      return [
        {
          header: 'Group',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectGroup).group_name,
        },
      ];
    case 'person.details':
      return [
        {
          header: 'First',
          accessorFn: (c) => (c.payload as PersonDetails).first_name,
        },
        {
          header: 'Last',
          accessorFn: (c) => (c.payload as PersonDetails).last_name,
        },
        {
          header: 'Email',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as PersonDetails).email_address,
        },
      ];
    case 'classification.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ClassificationDetails).classification_name,
        },
        {
          header: 'Number',
          accessorFn: (c) => (c.payload as ClassificationDetails).classification_number,
        },
      ];
    case 'jurisdiction.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as JurisdictionDetails).jurisdiction_name,
        },
      ];
    case 'jurisdiction.code':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => c.componentName,
        },
      ];
    case 'project.code.analysis.construction.type':
      return [
        {
          header: 'Code References',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectCodeAnalysisConstructionType).code_references,
        },
        {
          header: 'Versions',
          accessorFn: (c) =>
            (c.payload as ProjectCodeAnalysisConstructionType).code_reference_versions,
        },
        {
          header: 'Section',
          accessorFn: (c) => (c.payload as ProjectCodeAnalysisConstructionType).code_section,
        },
        {
          header: 'Construction Type',
          accessorFn: (c) => (c.payload as ProjectCodeAnalysisConstructionType).construction_type,
        },
        {
          header: 'Description',
          accessorFn: (c) =>
            (c.payload as ProjectCodeAnalysisConstructionType).construction_criteria_description,
        },
      ];
    case 'project.code.analysis.details':
      return [
        {
          header: 'Summary',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectCodeAnalysisDetails).controlling_codes,
        },
      ];
    case 'project.discipline':
      return [
        {
          header: 'Discipline',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDiscipline).discipline,
        },
      ];
    case 'scopeofwork.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ScopeofworkDetails).scope_name,
        },
        {
          header: 'Description',
          accessorFn: (c) => (c.payload as ScopeofworkDetails).scope_description,
        },
      ];
    case 'specification.master.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as SpecificationMasterDetails).specification_master_name,
        },
        {
          header: 'Specialization',
          accessorFn: (c) => (c.payload as SpecificationMasterDetails).master_specialization,
        },
        {
          header: 'Owner',
          accessorFn: (c) => (c.payload as SpecificationMasterDetails).master_owner,
        },
      ];
    default:
      return columns;
  }
};

export default getColumns;
