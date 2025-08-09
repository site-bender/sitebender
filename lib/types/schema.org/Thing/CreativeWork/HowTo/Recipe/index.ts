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

import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { ItemList as ItemListComponent } from "../../../../../../components/index.tsx"
import { NutritionInformation as NutritionInformationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { RestrictedDiet as RestrictedDietComponent } from "../../../../../../components/index.tsx"

export type RecipeType = "Recipe"

export interface RecipeProps {
	"@type"?: RecipeType
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
