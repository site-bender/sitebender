import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

export interface LegalServiceProps {
}

type LegalService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LegalServiceProps

export default LegalService
