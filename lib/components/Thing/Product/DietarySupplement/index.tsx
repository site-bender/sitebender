import type BaseProps from "../../../../types/index.ts"
import type DietarySupplementProps from "../../../../types/Thing/Product/DietarySupplement/index.ts"

import Product from "../index.tsx"

export type Props = DietarySupplementProps & BaseProps

export default function DietarySupplement({
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
	_type = "DietarySupplement",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
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
		>{children}</Product>
	)
}
