import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"

export type FastFoodRestaurantType = "FastFoodRestaurant"

export interface FastFoodRestaurantProps {
	"@type"?: FastFoodRestaurantType
}

type FastFoodRestaurant =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& FastFoodRestaurantProps

export default FastFoodRestaurant
