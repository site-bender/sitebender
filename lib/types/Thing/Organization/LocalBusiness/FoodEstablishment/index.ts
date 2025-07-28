import type { Boolean, Text, URL } from "../../../../DataType/index.ts"
import type Menu from "../../../CreativeWork/Menu/index.ts"
import type Thing from "../../../index.ts"
import type Rating from "../../../Intangible/Rating/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

import MenuComponent from "../../../../../components/Thing/CreativeWork/Menu/index.ts"
import RatingComponent from "../../../../../components/Thing/Intangible/Rating/index.ts"

export interface FoodEstablishmentProps {
	acceptsReservations?: Boolean | Text | URL
	hasMenu?: Menu | Text | URL | ReturnType<typeof MenuComponent>
	menu?: Menu | Text | URL | ReturnType<typeof MenuComponent>
	servesCuisine?: Text
	starRating?: Rating | ReturnType<typeof RatingComponent>
}

type FoodEstablishment =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& FoodEstablishmentProps

export default FoodEstablishment
