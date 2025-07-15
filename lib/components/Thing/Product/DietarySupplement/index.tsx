import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DietarySupplementProps from "../../../../types/Thing/DietarySupplement/index.ts"
import type ProductProps from "../../../../types/Thing/Product/index.ts"

import Product from "./index.tsx"

export type Props = BaseComponentProps<
	DietarySupplementProps,
	"DietarySupplement",
	ExtractLevelProps<DietarySupplementProps, ProductProps>
>

export default function DietarySupplement(
	{
		activeIngredient,
		isProprietary,
		legalStatus,
		maximumIntake,
		mechanismOfAction,
		nonProprietaryName,
		proprietaryName,
		recommendedIntake,
		safetyConsideration,
		targetPopulation,
		schemaType = "DietarySupplement",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				activeIngredient,
				isProprietary,
				legalStatus,
				maximumIntake,
				mechanismOfAction,
				nonProprietaryName,
				proprietaryName,
				recommendedIntake,
				safetyConsideration,
				targetPopulation,
				...subtypeProperties,
			}}
		/>
	)
}
