import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type RecyclingCenterType = "RecyclingCenter"

export interface RecyclingCenterProps {
	"@type"?: RecyclingCenterType
}

type RecyclingCenter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RecyclingCenterProps

export default RecyclingCenter
