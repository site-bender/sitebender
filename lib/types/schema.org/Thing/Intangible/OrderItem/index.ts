import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Product from "../../Product/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type Service from "../Service/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import { OrderStatus as OrderStatusComponent } from "../../../../../components/index.tsx"
import { OrderItem as OrderItemComponent } from "../../../../../components/index.tsx"
import { ParcelDelivery as ParcelDeliveryComponent } from "../../../../../components/index.tsx"
import { Service as ServiceComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"

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
