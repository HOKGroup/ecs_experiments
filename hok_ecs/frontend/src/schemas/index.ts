import classificationDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/classification.details.json';
import companyDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/company.details.json';
import companyLocationDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/company.location.details.json';
import component from '../../../../json_schema/Entity and Component Definitions/jsonschema/component.json';
import entity from '../../../../json_schema/Entity and Component Definitions/jsonschema/entity.json';
import jurisdictionCode from '../../../../json_schema/Entity and Component Definitions/jsonschema/jurisdiction.code.json';
import jurisdictionDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/jurisdiction.details.json';
import personDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/person.details.json';
import projectCodeAnalysisConstructionType from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.code.analysis.construction.type.json';
import projectCodeAnalysisDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.code.analysis.details.json';
import projectDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.details.json';
import projectDiscipline from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.discipline.json';
import projectGroup from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.group.json';
import projectLocationDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.location.details.json';
import projectLocationPolygon from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.location.polygon.json';
import projectPhase from '../../../../json_schema/Entity and Component Definitions/jsonschema/project.phase.json';
import qcChecklist from '../../../../json_schema/Entity and Component Definitions/jsonschema/qc.checklist.json';
import qcChecklistItem from '../../../../json_schema/Entity and Component Definitions/jsonschema/qc.checklist_item.json';
import scopeofworkDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/scopeofwork.details.json';
import specificationMasterDetails from '../../../../json_schema/Entity and Component Definitions/jsonschema/specification.master.details.json';
import specificationMasterSection from '../../../../json_schema/Entity and Component Definitions/jsonschema/specification.master.section.json';

export const getJsonSchema = (componentType: string) => {
  switch (componentType) {
    case 'classification.details':
      return classificationDetails;
    case 'company.details':
      return companyDetails;
    case 'company.location.details':
      return companyLocationDetails;
    case 'component':
      return component;
    case 'entity':
      return entity;
    case 'jurisdiction.code':
      return jurisdictionCode;
    case 'jurisdiction.details':
      return jurisdictionDetails;
    case 'person.details':
      return personDetails;
    case 'project.code.analysis.construction.type':
      return projectCodeAnalysisConstructionType;
    case 'project.code.analysis.details':
      return projectCodeAnalysisDetails;
    case 'project.details':
      return projectDetails;
    case 'project.discipline':
      return projectDiscipline;
    case 'project.group':
      return projectGroup;
    case 'project.location.details':
      return projectLocationDetails;
    case 'project.location.polygon':
      return projectLocationPolygon;
    case 'project.phase':
      return projectPhase;
    case 'qc.checklist':
      return qcChecklist;
    case 'qc.checklist_item':
      return qcChecklistItem;
    case 'scopeofwork.details':
      return scopeofworkDetails;
    case 'specification.master.details':
      return specificationMasterDetails;
    case 'specification.master.section':
      return specificationMasterSection;
  }
};
