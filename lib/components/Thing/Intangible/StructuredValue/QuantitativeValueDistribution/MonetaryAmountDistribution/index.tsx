import type BaseProps from "../../../../../../types/index.ts"
import type MonetaryAmountDistributionProps from "../../../../../../types/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

import QuantitativeValueDistribution from "../index.tsx"

export type Props = MonetaryAmountDistributionProps & BaseProps

export default function MonetaryAmountDistribution({
	_type = "MonetaryAmountDistribution",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<QuantitativeValueDistribution
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
