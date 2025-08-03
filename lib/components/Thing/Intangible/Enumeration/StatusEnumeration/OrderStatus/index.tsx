import type BaseProps from "../../../../../../types/index.ts"
import type { OrderStatus as OrderStatusProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = OrderStatusProps & BaseProps

export default function OrderStatus({
	_type = "OrderStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
