import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MonetaryAmountDistributionProps from "../../../../../../types/Thing/MonetaryAmountDistribution/index.ts"
import type QuantitativeValueDistributionProps from "../../../../../../types/Thing/QuantitativeValueDistribution/index.ts"

import QuantitativeValueDistribution from "../index.tsx"

// MonetaryAmountDistribution adds no properties to the QuantitativeValueDistribution schema type
export type Props = BaseComponentProps<
	MonetaryAmountDistributionProps,
	"MonetaryAmountDistribution",
	ExtractLevelProps<
		MonetaryAmountDistributionProps,
		QuantitativeValueDistributionProps
	>
>

export default function MonetaryAmountDistribution({
	schemaType = "MonetaryAmountDistribution",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<QuantitativeValueDistribution
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
