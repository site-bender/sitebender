import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type ChildCareType = "ChildCare"

export interface ChildCareProps {
	"@type"?: ChildCareType
}

type ChildCare =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ChildCareProps

export default ChildCare
