import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type OrderStatusType = "OrderStatus"

export interface OrderStatusProps {
	"@type"?: OrderStatusType
}

type OrderStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& OrderStatusProps

export default OrderStatus
