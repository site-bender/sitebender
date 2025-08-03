import type BaseProps from "../../../../../types/index.ts"
import type { QuantitativeValueDistribution as QuantitativeValueDistributionProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = QuantitativeValueDistributionProps & BaseProps

export default function QuantitativeValueDistribution({
	_type = "QuantitativeValueDistribution",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
