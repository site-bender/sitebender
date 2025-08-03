import type BaseProps from "../../../../../types/index.ts"
import type { QuantitativeValue as QuantitativeValueProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = QuantitativeValueProps & BaseProps

export default function QuantitativeValue({
	_type = "QuantitativeValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
