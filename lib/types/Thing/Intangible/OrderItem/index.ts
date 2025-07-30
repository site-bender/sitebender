import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Product from "../../Product/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type Service from "../Service/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import OrderStatusComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.ts"
import OrderItemComponent from "../../../../components/Thing/Intangible/OrderItem/index.ts"
import ParcelDeliveryComponent from "../../../../components/Thing/Intangible/ParcelDelivery/index.ts"
import ServiceComponent from "../../../../components/Thing/Intangible/Service/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

export interface OrderItemProps {
	"@type"?: "OrderItem"
	orderDelivery?: ParcelDelivery | ReturnType<typeof ParcelDeliveryComponent>
	orderedItem?:
		| OrderItem
		| Product
		| Service
		| ReturnType<typeof OrderItemComponent>
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	orderItemNumber?: Text
	orderItemStatus?: OrderStatus | ReturnType<typeof OrderStatusComponent>
	orderQuantity?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type OrderItem = Thing & IntangibleProps & OrderItemProps

export default OrderItem
