import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type HobbyShopType = "HobbyShop"

export interface HobbyShopProps {
	"@type"?: HobbyShopType
}

type HobbyShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& HobbyShopProps

export default HobbyShop
