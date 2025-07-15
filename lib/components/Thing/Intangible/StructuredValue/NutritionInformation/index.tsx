import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type NutritionInformationProps from "../../../../../types/Thing/NutritionInformation/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	NutritionInformationProps,
	"NutritionInformation",
	ExtractLevelProps<NutritionInformationProps, StructuredValueProps>
>

export default function NutritionInformation(
	{
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
	}: Props,
) {
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
