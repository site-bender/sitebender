import { Text } from "../../../../DataType/index.ts"
import RestrictedDiet from "../../../Intangible/Enumeration/RestrictedDiet/index.ts"
import ItemList from "../../../Intangible/ItemList/index.ts"
import Duration from "../../../Intangible/Quantity/Duration/index.ts"
import NutritionInformation from "../../../Intangible/StructuredValue/NutritionInformation/index.ts"
import QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import CreativeWork from "../..//index.ts"
import HowTo from "../index.ts"

export default interface Recipe extends HowTo {
	/** The time it takes to actually cook the dish, in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	cookTime?: Duration
	/** The method of cooking, such as Frying, Steaming, ... */
	cookingMethod?: Text
	/** A single ingredient used in the recipe, e.g. sugar, flour or garlic. */
	ingredients?: Text
	/** Nutrition information about the recipe or menu item. */
	nutrition?: NutritionInformation
	/** The category of the recipe—for example, appetizer, entree, etc. */
	recipeCategory?: Text
	/** The cuisine of the recipe (for example, French or Ethiopian). */
	recipeCuisine?: Text
	/** A single ingredient used in the recipe, e.g. sugar, flour or garlic. */
	recipeIngredient?: Text
	/** A step in making the recipe, in the form of a single item (document, video, etc.) or an ordered list with HowToStep and/or HowToSection items. */
	recipeInstructions?: ItemList | CreativeWork | Text
	/** The quantity produced by the recipe (for example, number of people served, number of servings, etc). */
	recipeYield?: QuantitativeValue | Text
	/** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
	suitableForDiet?: RestrictedDiet
}
