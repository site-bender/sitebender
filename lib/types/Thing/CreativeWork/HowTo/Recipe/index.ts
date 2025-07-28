import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { HowToProps } from "../index.ts"
import type CreativeWork from "../../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type NutritionInformation from "../../../Intangible/StructuredValue/NutritionInformation/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type RestrictedDiet from "../../../Intangible/Enumeration/RestrictedDiet/index.ts"

import RecipeComponent from "../../../../../../components/Thing/CreativeWork/HowTo/Recipe/index.tsx"

export interface RecipeProps {
	cookingMethod?: Text
	cookTime?: Duration
	ingredients?: Text
	nutrition?: NutritionInformation
	recipeCategory?: Text
	recipeCuisine?: Text
	recipeIngredient?: Text
	recipeInstructions?: CreativeWork | ItemList | Text
	recipeYield?: QuantitativeValue | Text
	suitableForDiet?: RestrictedDiet
}

type Recipe =
	& Thing
	& CreativeWorkProps
	& HowToProps
	& RecipeProps

export default Recipe
