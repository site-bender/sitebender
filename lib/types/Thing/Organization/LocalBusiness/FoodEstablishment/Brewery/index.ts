import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BreweryComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/Brewery/index.tsx"

export interface BreweryProps {
}

type Brewery =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& BreweryProps

export default Brewery
