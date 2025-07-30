import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalSpecialty from "../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type { OrganizationProps } from "../index.ts"

import MedicalSpecialtyComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"

export interface MedicalOrganizationProps {
	"@type"?: "MedicalOrganization"
	healthPlanNetworkId?: Text
	isAcceptingNewPatients?: Boolean
	medicalSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
}

type MedicalOrganization = Thing & OrganizationProps & MedicalOrganizationProps

export default MedicalOrganization
