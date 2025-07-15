import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type QualitativeValueProps from "../../../../../../types/Thing/QualitativeValue/index.ts"
import type SizeSpecificationProps from "../../../../../../types/Thing/SizeSpecification/index.ts"

import QualitativeValue from "./index.tsx"

export type Props = BaseComponentProps<
	SizeSpecificationProps,
	"SizeSpecification",
	ExtractLevelProps<SizeSpecificationProps, QualitativeValueProps>
>

export default function SizeSpecification(
	{
		hasMeasurement,
		sizeGroup,
		sizeSystem,
		suggestedAge,
		suggestedGender,
		suggestedMeasurement,
		schemaType = "SizeSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<QualitativeValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasMeasurement,
				sizeGroup,
				sizeSystem,
				suggestedAge,
				suggestedGender,
				suggestedMeasurement,
				...subtypeProperties,
			}}
		/>
	)
}
