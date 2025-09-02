import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../../MedicalOrganization/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { MedicalBusinessProps } from "../MedicalBusiness/index.ts"

export type DentistType = "Dentist"

export interface DentistProps {
	"@type"?: DentistType
}

type Dentist =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& MedicalOrganizationProps
	& PlaceProps
	& DentistProps

export default Dentist
