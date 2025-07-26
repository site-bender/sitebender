import type { Text } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DrugLegalStatus from "./MedicalIntangible/DrugLegalStatus/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type MedicalCode from "./MedicalIntangible/MedicalCode/index.ts"
import type MedicalEnumeration from "../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type MedicalGuideline from "./MedicalGuideline/index.ts"
import type MedicalSpecialty from "../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicalStudy from "./MedicalStudy/index.ts"
import type MedicineSystem from "../Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import type Organization from "../Organization/index.ts"

export interface MedicalEntityProps {
	code?: MedicalCode
	funding?: Grant
	guideline?: MedicalGuideline
	legalStatus?: DrugLegalStatus | MedicalEnumeration | Text
	medicineSystem?: MedicineSystem
	recognizingAuthority?: Organization
	relevantSpecialty?: MedicalSpecialty
	study?: MedicalStudy
}

type MedicalEntity =
	& Thing
	& MedicalEntityProps

export default MedicalEntity
