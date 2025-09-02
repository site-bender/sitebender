import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type TireShopType = "TireShop"

export interface TireShopProps {
	"@type"?: TireShopType
}

type TireShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& TireShopProps

export default TireShop
