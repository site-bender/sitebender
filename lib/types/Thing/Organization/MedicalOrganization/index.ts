import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type MedicalSpecialty from "../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"

export interface MedicalOrganizationProps {
	healthPlanNetworkId?: Text
	isAcceptingNewPatients?: Boolean
	medicalSpecialty?: MedicalSpecialty
}

type MedicalOrganization =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps

export default MedicalOrganization
