import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Product from "../../Product/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type Service from "../Service/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import OrderStatusComponent from "../../../../../src/define/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.tsx"
import OrderItemComponent from "../../../../../src/define/Thing/Intangible/OrderItem/index.tsx"
import ParcelDeliveryComponent from "../../../../../src/define/Thing/Intangible/ParcelDelivery/index.tsx"
import ServiceComponent from "../../../../../src/define/Thing/Intangible/Service/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import ProductComponent from "../../../../../src/define/Thing/Product/index.tsx"

export type OrderItemType = "OrderItem"

export interface OrderItemProps {
	"@type"?: OrderItemType
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
