import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Demand from "../Demand/index.ts"
import type MenuSection from "../../CreativeWork/MenuSection/index.ts"
import type NutritionInformation from "../StructuredValue/NutritionInformation/index.ts"
import type Offer from "../Offer/index.ts"
import type RestrictedDiet from "../Enumeration/RestrictedDiet/index.ts"

import MenuItemComponent from "../../../../../components/Thing/Intangible/MenuItem/index.tsx"

export interface MenuItemProps {
	menuAddOn?: MenuItem | MenuSection
	nutrition?: NutritionInformation
	offers?: Demand | Offer
	suitableForDiet?: RestrictedDiet
}

type MenuItem =
	& Thing
	& IntangibleProps
	& MenuItemProps

export default MenuItem
