import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BakeryComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/Bakery/index.tsx"

export interface BakeryProps {
}

type Bakery =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& BakeryProps

export default Bakery
