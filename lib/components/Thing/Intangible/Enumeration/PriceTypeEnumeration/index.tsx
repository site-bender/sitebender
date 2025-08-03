import type BaseProps from "../../../../../types/index.ts"
import type { PriceTypeEnumeration as PriceTypeEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = PriceTypeEnumerationProps & BaseProps

export default function PriceTypeEnumeration({
	_type = "PriceTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
