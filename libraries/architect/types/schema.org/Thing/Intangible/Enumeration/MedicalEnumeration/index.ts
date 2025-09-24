import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { DrugCostCategoryType } from "./DrugCostCategory/index.ts"
import type { DrugPregnancyCategoryType } from "./DrugPregnancyCategory/index.ts"
import type { DrugPrescriptionStatusType } from "./DrugPrescriptionStatus/index.ts"
import type { InfectiousAgentClassType } from "./InfectiousAgentClass/index.ts"
import type { MedicalAudienceTypeType } from "./MedicalAudienceType/index.ts"
import type { MedicalDevicePurposeType } from "./MedicalDevicePurpose/index.ts"
import type { MedicalEvidenceLevelType } from "./MedicalEvidenceLevel/index.ts"
import type { MedicalImagingTechniqueType } from "./MedicalImagingTechnique/index.ts"
import type { MedicalObservationalStudyDesignType } from "./MedicalObservationalStudyDesign/index.ts"
import type { MedicalProcedureTypeType } from "./MedicalProcedureType/index.ts"
import type { MedicalSpecialtyType } from "./MedicalSpecialty/index.ts"
import type { MedicalStudyStatusType } from "./MedicalStudyStatus/index.ts"
import type { MedicalTrialDesignType } from "./MedicalTrialDesign/index.ts"
import type { MedicineSystemType } from "./MedicineSystem/index.ts"
import type { PhysicalExamType } from "./PhysicalExam/index.ts"

export type MedicalEnumerationType =
	| "MedicalEnumeration"
	| MedicalProcedureTypeType
	| DrugCostCategoryType
	| MedicalTrialDesignType
	| MedicalDevicePurposeType
	| MedicalSpecialtyType
	| MedicalImagingTechniqueType
	| MedicalObservationalStudyDesignType
	| MedicalEvidenceLevelType
	| MedicalAudienceTypeType
	| DrugPrescriptionStatusType
	| MedicalStudyStatusType
	| InfectiousAgentClassType
	| PhysicalExamType
	| MedicineSystemType
	| DrugPregnancyCategoryType

export interface MedicalEnumerationProps {
	"@type"?: MedicalEnumerationType
}

type MedicalEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps

export default MedicalEnumeration
