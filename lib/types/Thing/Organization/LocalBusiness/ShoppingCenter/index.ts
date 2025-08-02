import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type ShoppingCenterType = "ShoppingCenter"

export interface ShoppingCenterProps {
	"@type"?: ShoppingCenterType
}

type ShoppingCenter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ShoppingCenterProps

export default ShoppingCenter
