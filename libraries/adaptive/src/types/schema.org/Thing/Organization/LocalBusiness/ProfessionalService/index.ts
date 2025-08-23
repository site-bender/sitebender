import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type ProfessionalServiceType = "ProfessionalService"

export interface ProfessionalServiceProps {
	"@type"?: ProfessionalServiceType
}

type ProfessionalService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ProfessionalServiceProps

export default ProfessionalService
