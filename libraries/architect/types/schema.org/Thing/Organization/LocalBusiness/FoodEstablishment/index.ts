import type { Boolean, Text, URL } from "../../../../DataType/index.ts"
import type Menu from "../../../CreativeWork/Menu/index.ts"
import type Thing from "../../../index.ts"
import type Rating from "../../../Intangible/Rating/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { BakeryType } from "./Bakery/index.ts"
import type { BarOrPubType } from "./BarOrPub/index.ts"
import type { BreweryType } from "./Brewery/index.ts"
import type { CafeOrCoffeeShopType } from "./CafeOrCoffeeShop/index.ts"
import type { DistilleryType } from "./Distillery/index.ts"
import type { FastFoodRestaurantType } from "./FastFoodRestaurant/index.ts"
import type { IceCreamShopType } from "./IceCreamShop/index.ts"
import type { RestaurantType } from "./Restaurant/index.ts"
import type { WineryType } from "./Winery/index.ts"

import MenuComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/Menu/index.tsx"
import RatingComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Rating/index.tsx"

export type FoodEstablishmentType =
	| "FoodEstablishment"
	| RestaurantType
	| CafeOrCoffeeShopType
	| DistilleryType
	| BakeryType
	| BreweryType
	| FastFoodRestaurantType
	| BarOrPubType
	| IceCreamShopType
	| WineryType

export interface FoodEstablishmentProps {
	"@type"?: FoodEstablishmentType
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
