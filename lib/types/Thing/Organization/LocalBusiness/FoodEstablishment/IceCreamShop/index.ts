import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import IceCreamShopComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/IceCreamShop/index.tsx"

export interface IceCreamShopProps {
}

type IceCreamShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& IceCreamShopProps

export default IceCreamShop
