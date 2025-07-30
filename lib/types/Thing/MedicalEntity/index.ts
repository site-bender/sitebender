import type { Text } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type MedicalEnumeration from "../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type MedicalSpecialty from "../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicineSystem from "../Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type Organization from "../Organization/index.ts"
import type MedicalGuideline from "./MedicalGuideline/index.ts"
import type DrugLegalStatus from "./MedicalIntangible/DrugLegalStatus/index.ts"
import type MedicalCode from "./MedicalIntangible/MedicalCode/index.ts"
import type MedicalStudy from "./MedicalStudy/index.ts"

import MedicalEnumerationComponent from "../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/index.ts"
import MedicalSpecialtyComponent from "../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import MedicineSystemComponent from "../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import GrantComponent from "../../../components/Thing/Intangible/Grant/index.ts"
import MedicalGuidelineComponent from "../../../components/Thing/MedicalEntity/MedicalGuideline/index.ts"
import DrugLegalStatusComponent from "../../../components/Thing/MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import MedicalCodeComponent from "../../../components/Thing/MedicalEntity/MedicalIntangible/MedicalCode/index.ts"
import MedicalStudyComponent from "../../../components/Thing/MedicalEntity/MedicalStudy/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"

export interface MedicalEntityProps {
	"@type"?: "MedicalEntity"
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
	recognizingAuthority?: Organization | ReturnType<typeof OrganizationComponent>
	relevantSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
	study?: MedicalStudy | ReturnType<typeof MedicalStudyComponent>
}

type MedicalEntity = Thing & MedicalEntityProps

export default MedicalEntity
