import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { QuantitativeValueDistributionProps } from "../../../../../types/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	QuantitativeValueDistributionProps,
	"QuantitativeValueDistribution",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function QuantitativeValueDistribution({
	duration,
	median,
	percentile10,
	percentile25,
	percentile75,
	percentile90,
	schemaType = "QuantitativeValueDistribution",
	subtypeProperties = {},
	...props
}): Props {
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
