import type Thing from "../../../index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface OrderActionProps {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
}

type OrderAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& OrderActionProps

export default OrderAction
