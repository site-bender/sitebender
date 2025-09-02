import type BaseProps from "../../../../../types/index.ts"
import type { OrderItem as OrderItemProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = OrderItemProps & BaseProps

export default function OrderItem({
	_type = "OrderItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
