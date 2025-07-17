import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type OrderStatusProps from "../../../../../../types/Thing/OrderStatus/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// OrderStatus adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	OrderStatusProps,
	"OrderStatus",
	ExtractLevelProps<OrderStatusProps, StatusEnumerationProps>
>

export default function OrderStatus({
	schemaType = "OrderStatus",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<StatusEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
