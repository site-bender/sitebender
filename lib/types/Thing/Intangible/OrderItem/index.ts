import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type Product from "../../Product/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type Service from "../Service/index.ts"

export interface OrderItemProps {
	orderDelivery?: ParcelDelivery
	orderedItem?: OrderItem | Product | Service
	orderItemNumber?: Text
	orderItemStatus?: OrderStatus
	orderQuantity?: Number | QuantitativeValue
}

type OrderItem =
	& Thing
	& IntangibleProps
	& OrderItemProps

export default OrderItem
