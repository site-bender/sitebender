import type MenuSection from "../../CreativeWork/MenuSection/index.ts"
import type Thing from "../../index.ts"
import type Demand from "../Demand/index.ts"
import type RestrictedDiet from "../Enumeration/RestrictedDiet/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type NutritionInformation from "../StructuredValue/NutritionInformation/index.ts"

import MenuSectionComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MenuSection/index.tsx"
import DemandComponent from "../../../../../../codewright/src/define/Thing/Intangible/Demand/index.tsx"
import RestrictedDietComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/RestrictedDiet/index.tsx"
import MenuItemComponent from "../../../../../../codewright/src/define/Thing/Intangible/MenuItem/index.tsx"
import OfferComponent from "../../../../../../codewright/src/define/Thing/Intangible/Offer/index.tsx"
import NutritionInformationComponent from "../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/NutritionInformation/index.tsx"

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
	suitableForDiet?:
		| RestrictedDiet
		| ReturnType<typeof RestrictedDietComponent>
}

type MenuItem = Thing & IntangibleProps & MenuItemProps

export default MenuItem
