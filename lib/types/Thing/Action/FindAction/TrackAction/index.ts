import DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import FindAction from "../index.ts"

export default interface TrackAction extends FindAction {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
}
