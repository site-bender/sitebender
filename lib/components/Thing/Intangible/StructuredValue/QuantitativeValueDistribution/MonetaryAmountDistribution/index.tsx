import type BaseProps from "../../../../../../types/index.ts"
import type { MonetaryAmountDistribution as MonetaryAmountDistributionProps } from "../../../../../../types/index.ts"

import QuantitativeValueDistribution from "../index.tsx"

export type Props = MonetaryAmountDistributionProps & BaseProps

export default function MonetaryAmountDistribution({
	_type = "MonetaryAmountDistribution",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
