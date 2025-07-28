import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { NutritionInformationProps } from "../../../../../types/Thing/Intangible/StructuredValue/NutritionInformation/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	NutritionInformationProps,
	"NutritionInformation",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

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
	schemaType = "NutritionInformation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
