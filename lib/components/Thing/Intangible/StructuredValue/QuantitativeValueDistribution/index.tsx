import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type QuantitativeValueDistributionProps from "../../../../../types/Thing/QuantitativeValueDistribution/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	QuantitativeValueDistributionProps,
	"QuantitativeValueDistribution",
	ExtractLevelProps<QuantitativeValueDistributionProps, StructuredValueProps>
>

export default function QuantitativeValueDistribution(
	{
		duration,
		median,
		percentile10,
		percentile25,
		percentile75,
		percentile90,
		schemaType = "QuantitativeValueDistribution",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				duration,
				median,
				percentile10,
				percentile25,
				percentile75,
				percentile90,
				...subtypeProperties,
			}}
		/>
	)
}
