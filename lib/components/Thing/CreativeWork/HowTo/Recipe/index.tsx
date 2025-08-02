import type BaseProps from "../../../../../types/index.ts"
import type RecipeProps from "../../../../../types/Thing/CreativeWork/HowTo/Recipe/index.ts"

import HowTo from "../index.tsx"

export type Props = RecipeProps & BaseProps

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
	_type = "Recipe",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HowTo
			{...props}
			_type={_type}
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
		>
			{children}
		</HowTo>
	)
}
