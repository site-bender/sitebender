import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"

export interface OrderActionProps {
	deliveryMethod?: DeliveryMethod
}

type OrderAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& OrderActionProps

export default OrderAction
