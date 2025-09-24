import type BaseProps from "../../../../../types/index.ts"
import type { SaleEvent as SaleEventProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SaleEventProps & BaseProps

export default function SaleEvent({
	_type = "SaleEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
