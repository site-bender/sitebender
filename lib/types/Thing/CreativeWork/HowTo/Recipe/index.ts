import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type RestrictedDiet from "../../../Intangible/Enumeration/RestrictedDiet/index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type NutritionInformation from "../../../Intangible/StructuredValue/NutritionInformation/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { HowToProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"
import RestrictedDietComponent from "../../../../../components/Thing/Intangible/Enumeration/RestrictedDiet/index.ts"
import ItemListComponent from "../../../../../components/Thing/Intangible/ItemList/index.ts"
import DurationComponent from "../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import NutritionInformationComponent from "../../../../../components/Thing/Intangible/StructuredValue/NutritionInformation/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface RecipeProps {
	cookingMethod?: Text
	cookTime?: Duration | ReturnType<typeof DurationComponent>
	ingredients?: Text
	nutrition?:
		| NutritionInformation
		| ReturnType<typeof NutritionInformationComponent>
	recipeCategory?: Text
	recipeCuisine?: Text
	recipeIngredient?: Text
	recipeInstructions?:
		| CreativeWork
		| ItemList
		| Text
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof ItemListComponent>
	recipeYield?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	suitableForDiet?: RestrictedDiet | ReturnType<typeof RestrictedDietComponent>
}

type Recipe = Thing & CreativeWorkProps & HowToProps & RecipeProps

export default Recipe
