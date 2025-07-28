import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import RestaurantComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/Restaurant/index.tsx"

export interface RestaurantProps {
}

type Restaurant =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& RestaurantProps

export default Restaurant
