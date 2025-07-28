import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { OrderItemProps } from "../../../../types/Thing/Intangible/OrderItem/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	OrderItemProps,
	"OrderItem",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function OrderItem({
	orderDelivery,
	orderedItem,
	orderItemNumber,
	orderItemStatus,
	orderQuantity,
	schemaType = "OrderItem",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
