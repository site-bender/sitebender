import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface CafeOrCoffeeShopProps {
}

type CafeOrCoffeeShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& CafeOrCoffeeShopProps

export default CafeOrCoffeeShop
