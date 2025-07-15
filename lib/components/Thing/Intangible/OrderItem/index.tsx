import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type OrderItemProps from "../../../../types/Thing/OrderItem/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	OrderItemProps,
	"OrderItem",
	ExtractLevelProps<OrderItemProps, IntangibleProps>
>

export default function OrderItem(
	{
		orderDelivery,
		orderItemNumber,
		orderItemStatus,
		orderQuantity,
		orderedItem,
		schemaType = "OrderItem",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				orderDelivery,
				orderItemNumber,
				orderItemStatus,
				orderQuantity,
				orderedItem,
				...subtypeProperties,
			}}
		/>
	)
}
