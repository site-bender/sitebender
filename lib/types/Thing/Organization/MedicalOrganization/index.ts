import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalSpecialty from "../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import type Organization from "../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface MedicalOrganizationProps {
	/** Name or unique ID of network. (Networks are often reused across different insurance plans.) */
	healthPlanNetworkId?: Text
	/** Whether the provider is accepting new patients. */
	isAcceptingNewPatients?: Boolean
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}

type MedicalOrganization = Thing & OrganizationProps & MedicalOrganizationProps

export default MedicalOrganization
