import { z } from 'zod';
import classificationDetails from './schemas/classificationDetails';
import companyDetails from './schemas/companyDetails';
import companyLocationDetails from './schemas/companyLocationDetails';
import jurisdictionCode from './schemas/jurisdictionCode';
import jurisdictionDetails from './schemas/jurisdictionDetails';
import personDetails from './schemas/personDetails';
import projectCodeAnalysisConstructionType from './schemas/projectCodeAnalysisConstructionType';
import projectCodeAnalysisDetails from './schemas/projectCodeAnalysisDetails';
import projectDetails from './schemas/projectDetails';
import projectDiscipline from './schemas/projectDiscipline';
import projectGroup from './schemas/projectGroup';
import projectLocationDetails from './schemas/projectLocationDetails';
import projectLocationPolygon from './schemas/projectLocationPolygon';
import projectPhase from './schemas/projectPhase';
import qcChecklist from './schemas/qcChecklist';
import qcChecklistItem from './schemas/qcChecklistItem';
import scopeofworkDetails from './schemas/scopeofworkDetails';
import specificationMasterDetails from './schemas/specificationMasterDetails';
import specificationMasterSection from './schemas/specificationMasterSection';

const payloadSchema = z.union([
  classificationDetails,
  companyDetails,
  companyLocationDetails,
  jurisdictionCode,
  jurisdictionDetails,
  personDetails,
  projectCodeAnalysisConstructionType,
  projectCodeAnalysisDetails,
  projectDetails,
  projectDiscipline,
  projectGroup,
  projectLocationDetails,
  projectLocationPolygon,
  projectPhase,
  qcChecklist,
  qcChecklistItem,
  scopeofworkDetails,
  specificationMasterDetails,
  specificationMasterSection,
]);

export type Payload = z.infer<typeof payloadSchema>;

const parsePayload = (type: string, payload: unknown): Payload => {
  try {
    switch (type) {
      case 'classification.details':
        return classificationDetails.parse(payload);
      case 'company.details':
        return companyDetails.parse(payload);
      case 'company.location.details':
        return companyLocationDetails.parse(payload);
      case 'jurisdiction.code':
        return jurisdictionCode.parse(payload);
      case 'jurisdiction.details':
        return jurisdictionDetails.parse(payload);
      case 'person.details':
        return personDetails.parse(payload);
      case 'project.code.analysis.construction.type':
        return projectCodeAnalysisConstructionType.parse(payload);
      case 'project.code.analysis.details':
        return projectCodeAnalysisDetails.parse(payload);
      case 'project.details':
        return projectDetails.parse(payload);
      case 'project.discipline':
        return projectDiscipline.parse(payload);
      case 'project.group':
        return projectGroup.parse(payload);
      case 'project.location.details':
        return projectLocationDetails.parse(payload);
      case 'project.location.polygon':
        return projectLocationPolygon.parse(payload);
      case 'project.phase':
        return projectPhase.parse(payload);
      case 'qc.checklist':
        return qcChecklist.parse(payload);
      case 'qc.checklist.item':
        return qcChecklistItem.parse(payload);
      case 'scopeofwork.details':
        return scopeofworkDetails.parse(payload);
      case 'specification.master.details':
        return specificationMasterDetails.parse(payload);
      case 'specification.master.section':
        return specificationMasterSection.parse(payload);
      default:
        console.warn('Unknown payload type: ', type);
        return {} as Payload;
    }
  } catch (err) {
    console.error(`Error parsing payload of type ${type}: `, err);
    return {} as Payload;
  }
};

export default parsePayload;
