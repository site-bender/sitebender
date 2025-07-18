import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type TradeAction from "../index.ts"

export default interface OrderAction extends TradeAction {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
}
