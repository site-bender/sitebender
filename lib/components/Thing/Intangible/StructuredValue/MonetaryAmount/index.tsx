import type BaseProps from "../../../../../types/index.ts"
import type { MonetaryAmount as MonetaryAmountProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = MonetaryAmountProps & BaseProps

export default function MonetaryAmount({
	_type = "MonetaryAmount",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
