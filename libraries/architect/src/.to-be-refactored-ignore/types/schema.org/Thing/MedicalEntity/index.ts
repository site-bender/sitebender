import type { Text } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type MedicalEnumeration from "../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type MedicalSpecialty from "../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicineSystem from "../Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type Organization from "../Organization/index.ts"
import type { AnatomicalStructureType } from "./AnatomicalStructure/index.ts"
import type { AnatomicalSystemType } from "./AnatomicalSystem/index.ts"
import type { DrugClassType } from "./DrugClass/index.ts"
import type { DrugCostType } from "./DrugCost/index.ts"
import type { LifestyleModificationType } from "./LifestyleModification/index.ts"
import type { MedicalCauseType } from "./MedicalCause/index.ts"
import type { MedicalConditionType } from "./MedicalCondition/index.ts"
import type { MedicalContraindicationType } from "./MedicalContraindication/index.ts"
import type { MedicalDeviceType } from "./MedicalDevice/index.ts"
import type MedicalGuideline from "./MedicalGuideline/index.ts"
import type { MedicalGuidelineType } from "./MedicalGuideline/index.ts"
import type { MedicalIndicationType } from "./MedicalIndication/index.ts"
import type DrugLegalStatus from "./MedicalIntangible/DrugLegalStatus/index.ts"
import type { MedicalIntangibleType } from "./MedicalIntangible/index.ts"
import type MedicalCode from "./MedicalIntangible/MedicalCode/index.ts"
import type { MedicalProcedureType } from "./MedicalProcedure/index.ts"
import type { MedicalRiskEstimatorType } from "./MedicalRiskEstimator/index.ts"
import type { MedicalRiskFactorType } from "./MedicalRiskFactor/index.ts"
import type MedicalStudy from "./MedicalStudy/index.ts"
import type { MedicalStudyType } from "./MedicalStudy/index.ts"
import type { MedicalTestType } from "./MedicalTest/index.ts"
import type { SubstanceType } from "./Substance/index.ts"
import type { SuperficialAnatomyType } from "./SuperficialAnatomy/index.ts"

import MedicalEnumerationComponent from "../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/index.tsx"
import MedicalSpecialtyComponent from "../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.tsx"
import MedicineSystemComponent from "../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.tsx"
import GrantComponent from "../../../../src/define/Thing/Intangible/Grant/index.tsx"
import MedicalGuidelineComponent from "../../../../src/define/Thing/MedicalEntity/MedicalGuideline/index.tsx"
import DrugLegalStatusComponent from "../../../../src/define/Thing/MedicalEntity/MedicalIntangible/DrugLegalStatus/index.tsx"
import MedicalCodeComponent from "../../../../src/define/Thing/MedicalEntity/MedicalIntangible/MedicalCode/index.tsx"
import MedicalStudyComponent from "../../../../src/define/Thing/MedicalEntity/MedicalStudy/index.tsx"
import OrganizationComponent from "../../../../src/define/Thing/Organization/index.tsx"

export type MedicalEntityType =
	| "MedicalEntity"
	| MedicalProcedureType
	| DrugClassType
	| MedicalGuidelineType
	| MedicalIndicationType
	| MedicalConditionType
	| MedicalRiskEstimatorType
	| LifestyleModificationType
	| MedicalDeviceType
	| SubstanceType
	| MedicalTestType
	| AnatomicalStructureType
	| SuperficialAnatomyType
	| MedicalContraindicationType
	| DrugCostType
	| AnatomicalSystemType
	| MedicalStudyType
	| MedicalCauseType
	| MedicalIntangibleType
	| MedicalRiskFactorType

export interface MedicalEntityProps {
	"@type"?: MedicalEntityType
	code?: MedicalCode | ReturnType<typeof MedicalCodeComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	guideline?: MedicalGuideline | ReturnType<typeof MedicalGuidelineComponent>
	legalStatus?:
		| DrugLegalStatus
		| MedicalEnumeration
		| Text
		| ReturnType<typeof DrugLegalStatusComponent>
		| ReturnType<typeof MedicalEnumerationComponent>
	medicineSystem?: MedicineSystem | ReturnType<typeof MedicineSystemComponent>
	recognizingAuthority?:
		| Organization
		| ReturnType<typeof OrganizationComponent>
	relevantSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
	study?: MedicalStudy | ReturnType<typeof MedicalStudyComponent>
}

type MedicalEntity = Thing & MedicalEntityProps

export default MedicalEntity
