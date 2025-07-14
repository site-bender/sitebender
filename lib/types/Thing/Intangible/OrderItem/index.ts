import { Number, Text } from "../../../DataType/index.ts"
import Product from "../../Product/index.ts"
import OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import Intangible from "../index.ts"
import ParcelDelivery from "../ParcelDelivery/index.ts"
import Service from "../Service/index.ts"
import QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export default interface OrderItem extends Intangible {
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
