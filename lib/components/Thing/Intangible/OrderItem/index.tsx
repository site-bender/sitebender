import type BaseProps from "../../../../types/index.ts"
import type { OrderItemProps } from "../../../../types/Thing/Intangible/OrderItem/index.ts"

import Intangible from "../index.tsx"

export type Props = OrderItemProps & BaseProps

export default function OrderItem({
	orderDelivery,
	orderedItem,
	orderItemNumber,
	orderItemStatus,
	orderQuantity,
	_type = "OrderItem",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				orderDelivery,
				orderedItem,
				orderItemNumber,
				orderItemStatus,
				orderQuantity,
				...subtypeProperties,
			}}
		/>
	)
}
