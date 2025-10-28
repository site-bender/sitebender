import type Thing from "../../../index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { EmergencyServiceProps } from "../../LocalBusiness/EmergencyService/index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export type HospitalType = "Hospital"

export interface HospitalProps {
	"@type"?: HospitalType
}

type Hospital =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& EmergencyServiceProps
	& PlaceProps
	& CivicStructureProps
	& MedicalOrganizationProps
	& HospitalProps

export default Hospital
