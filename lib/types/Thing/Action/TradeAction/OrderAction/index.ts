import DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import TradeAction from "../index.ts"

export default interface OrderAction extends TradeAction {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
}
