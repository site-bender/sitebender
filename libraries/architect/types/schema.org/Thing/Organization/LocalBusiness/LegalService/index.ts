import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { AttorneyType } from "./Attorney/index.ts"
import type { NotaryType } from "./Notary/index.ts"

export type LegalServiceType = "LegalService" | NotaryType | AttorneyType

export interface LegalServiceProps {
	"@type"?: LegalServiceType
}

type LegalService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LegalServiceProps

export default LegalService
