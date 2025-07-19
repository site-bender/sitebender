import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Product from "../../Product/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type Service from "../Service/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface OrderItemProps {
	/** The delivery of the parcel related to this order or order item. */
	orderDelivery?: ParcelDelivery
	/** The identifier of the order item. */
	orderItemNumber?: Text
	/** The current status of the order item. */
	orderItemStatus?: OrderStatus
	/** The number of the item ordered. If the property is not set, assume the quantity is one. */
	orderQuantity?: Number | QuantitativeValue
	/** The item ordered. */
	orderedItem?: Service | OrderItem | Product
}

type OrderItem =
	& Thing
	& IntangibleProps
	& OrderItemProps

export default OrderItem
