import type BaseProps from "../../../../../types/index.ts"
import type NutritionInformationProps from "../../../../../types/Thing/Intangible/StructuredValue/NutritionInformation/index.ts"

import StructuredValue from "../index.tsx"

export type Props = NutritionInformationProps & BaseProps

export default function NutritionInformation({
	calories,
	carbohydrateContent,
	cholesterolContent,
	fatContent,
	fiberContent,
	proteinContent,
	saturatedFatContent,
	servingSize,
	sodiumContent,
	sugarContent,
	transFatContent,
	unsaturatedFatContent,
	_type = "NutritionInformation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				calories,
				carbohydrateContent,
				cholesterolContent,
				fatContent,
				fiberContent,
				proteinContent,
				saturatedFatContent,
				servingSize,
				sodiumContent,
				sugarContent,
				transFatContent,
				unsaturatedFatContent,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
