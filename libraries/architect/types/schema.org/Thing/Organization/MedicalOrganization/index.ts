import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalSpecialty from "../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type { OrganizationProps } from "../index.ts"
import type { DentistType } from "./Dentist/index.ts"
import type { DiagnosticLabType } from "./DiagnosticLab/index.ts"
import type { HospitalType } from "./Hospital/index.ts"
import type { MedicalClinicType } from "./MedicalClinic/index.ts"
import type { PharmacyType } from "./Pharmacy/index.ts"
import type { PhysicianType } from "./Physician/index.ts"
import type { VeterinaryCareType } from "./VeterinaryCare/index.ts"

import { MedicalSpecialty as MedicalSpecialtyComponent } from "../../../../../pagewright/index.tsx"

export type MedicalOrganizationType =
	| "MedicalOrganization"
	| PharmacyType
	| MedicalClinicType
	| VeterinaryCareType
	| DentistType
	| HospitalType
	| DiagnosticLabType
	| PhysicianType

export interface MedicalOrganizationProps {
	"@type"?: MedicalOrganizationType
	healthPlanNetworkId?: Text
	isAcceptingNewPatients?: Boolean
	medicalSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
}

type MedicalOrganization = Thing & OrganizationProps & MedicalOrganizationProps

export default MedicalOrganization
