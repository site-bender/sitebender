import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

export interface ProfessionalServiceProps {
}

type ProfessionalService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ProfessionalServiceProps

export default ProfessionalService
