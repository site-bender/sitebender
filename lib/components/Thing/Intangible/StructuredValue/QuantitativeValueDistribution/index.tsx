import type BaseProps from "../../../../../types/index.ts"
import type QuantitativeValueDistributionProps from "../../../../../types/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/index.ts"

import StructuredValue from "../index.tsx"

export type Props = QuantitativeValueDistributionProps & BaseProps

export default function QuantitativeValueDistribution({
	duration,
	median,
	percentile10,
	percentile25,
	percentile75,
	percentile90,
	_type = "QuantitativeValueDistribution",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				duration,
				median,
				percentile10,
				percentile25,
				percentile75,
				percentile90,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
