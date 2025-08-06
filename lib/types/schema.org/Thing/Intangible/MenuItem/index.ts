import type MenuSection from "../../CreativeWork/MenuSection/index.ts"
import type Thing from "../../index.ts"
import type Demand from "../Demand/index.ts"
import type RestrictedDiet from "../Enumeration/RestrictedDiet/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type NutritionInformation from "../StructuredValue/NutritionInformation/index.ts"

import { MenuSection as MenuSectionComponent } from "../../../../../components/index.tsx"
import { Demand as DemandComponent } from "../../../../../components/index.tsx"
import { RestrictedDiet as RestrictedDietComponent } from "../../../../../components/index.tsx"
import { MenuItem as MenuItemComponent } from "../../../../../components/index.tsx"
import { Offer as OfferComponent } from "../../../../../components/index.tsx"
import { NutritionInformation as NutritionInformationComponent } from "../../../../../components/index.tsx"

export type MenuItemType = "MenuItem"

export interface MenuItemProps {
	"@type"?: MenuItemType
	menuAddOn?:
		| MenuItem
		| MenuSection
		| ReturnType<typeof MenuItemComponent>
		| ReturnType<typeof MenuSectionComponent>
	nutrition?:
		| NutritionInformation
		| ReturnType<typeof NutritionInformationComponent>
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	suitableForDiet?: RestrictedDiet | ReturnType<typeof RestrictedDietComponent>
}

type MenuItem = Thing & IntangibleProps & MenuItemProps

export default MenuItem
