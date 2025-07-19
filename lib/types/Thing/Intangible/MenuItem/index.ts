import type MenuSection from "../../CreativeWork/MenuSection/index.ts"
import type Thing from "../../index.ts"
import type Demand from "../Demand/index.ts"
import type RestrictedDiet from "../Enumeration/RestrictedDiet/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type NutritionInformation from "../StructuredValue/NutritionInformation/index.ts"

export interface MenuItemProps {
	/** Additional menu item(s) such as a side dish of salad or side order of fries that can be added to this menu item. Additionally it can be a menu section containing allowed add-on menu items for this menu item. */
	menuAddOn?: MenuItem | MenuSection
	/** Nutrition information about the recipe or menu item. */
	nutrition?: NutritionInformation
	/** An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
	offers?: Demand | Offer
	/** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
	suitableForDiet?: RestrictedDiet
}

type MenuItem =
	& Thing
	& IntangibleProps
	& MenuItemProps

export default MenuItem
