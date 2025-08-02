import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export type PharmacyType = "Pharmacy"

export interface PharmacyProps {
	"@type"?: PharmacyType
}

type Pharmacy =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& PlaceProps
	& MedicalOrganizationProps
	& PharmacyProps

export default Pharmacy
