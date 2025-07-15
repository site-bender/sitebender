import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HowToProps from "../../../../../types/Thing/HowTo/index.ts"
import type RecipeProps from "../../../../../types/Thing/Recipe/index.ts"

import HowTo from "./index.tsx"

export type Props = BaseComponentProps<
	RecipeProps,
	"Recipe",
	ExtractLevelProps<RecipeProps, HowToProps>
>

export default function Recipe(
	{
		cookTime,
		cookingMethod,
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
	}: Props,
) {
	return (
		<HowTo
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				cookTime,
				cookingMethod,
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
