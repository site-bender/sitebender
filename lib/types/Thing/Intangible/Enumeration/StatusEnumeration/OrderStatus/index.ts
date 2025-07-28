import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

import OrderStatusComponent from "../../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.tsx"

export interface OrderStatusProps {
}

type OrderStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& OrderStatusProps

export default OrderStatus
