import { Boolean, Text } from "../../../DataType/index.ts"
import MedicalSpecialty from "../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import Organization from "../index.ts"

export default interface MedicalOrganization extends Organization {
	/** Name or unique ID of network. (Networks are often reused across different insurance plans.) */
	healthPlanNetworkId?: Text
	/** Whether the provider is accepting new patients. */
	isAcceptingNewPatients?: Boolean
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}
