import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { HowToProps } from "../../../../../types/Thing/CreativeWork/HowTo/index.ts"
import type { RecipeProps } from "../../../../../types/Thing/CreativeWork/HowTo/Recipe/index.ts"

import HowTo from "../index.tsx"

export type Props = BaseComponentProps<
	RecipeProps,
	"Recipe",
	ExtractLevelProps<ThingProps, CreativeWorkProps, HowToProps>
>

export default function Recipe({
	cookingMethod,
	cookTime,
	ingredients,
	nutrition,
	recipeCategory,
	recipeCuisine,
	recipeIngredient,
	recipeInstructions,
	recipeYield,
	suitableForDiet,
	schemaType = "Recipe",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<HowTo
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				cookingMethod,
				cookTime,
				ingredients,
				nutrition,
				recipeCategory,
				recipeCuisine,
				recipeIngredient,
				recipeInstructions,
				recipeYield,
				suitableForDiet,
				...subtypeProperties,
			}}
		/>
	)
}
