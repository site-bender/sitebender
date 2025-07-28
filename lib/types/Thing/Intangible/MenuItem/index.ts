import type MenuSection from "../../CreativeWork/MenuSection/index.ts"
import type Thing from "../../index.ts"
import type Demand from "../Demand/index.ts"
import type RestrictedDiet from "../Enumeration/RestrictedDiet/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type NutritionInformation from "../StructuredValue/NutritionInformation/index.ts"

import MenuSectionComponent from "../../../../components/Thing/CreativeWork/MenuSection/index.ts"
import DemandComponent from "../../../../components/Thing/Intangible/Demand/index.ts"
import RestrictedDietComponent from "../../../../components/Thing/Intangible/Enumeration/RestrictedDiet/index.ts"
import MenuItemComponent from "../../../../components/Thing/Intangible/MenuItem/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"
import NutritionInformationComponent from "../../../../components/Thing/Intangible/StructuredValue/NutritionInformation/index.ts"

export interface MenuItemProps {
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
