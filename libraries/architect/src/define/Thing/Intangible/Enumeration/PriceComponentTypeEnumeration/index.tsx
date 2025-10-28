import type BaseProps from "../../../../../../types/index.ts"
import type { PriceComponentTypeEnumeration as PriceComponentTypeEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PriceComponentTypeEnumerationProps & BaseProps

export default function PriceComponentTypeEnumeration({
	_type = "PriceComponentTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
