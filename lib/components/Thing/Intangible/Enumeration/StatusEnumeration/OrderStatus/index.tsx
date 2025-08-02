import type BaseProps from "../../../../../../types/index.ts"
import type OrderStatusProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = OrderStatusProps & BaseProps

export default function OrderStatus({
	_type = "OrderStatus",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</StatusEnumeration>
	)
}
