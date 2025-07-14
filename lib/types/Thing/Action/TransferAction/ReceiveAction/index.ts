import Audience from "../../../Intangible/Audience/index.ts"
import DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import TransferAction from "../index.ts"

export default interface ReceiveAction extends TransferAction {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
	/** A sub property of participant. The participant who is at the sending end of the action. */
	sender?: Person | Audience | Organization
}
