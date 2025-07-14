import Audience from "../../../Intangible/Audience/index.ts"
import DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import TransferAction from "../index.ts"

export default interface SendAction extends TransferAction {
	/** A sub property of instrument. The method of delivery. */
	deliveryMethod?: DeliveryMethod
	/** A sub property of participant. The participant who is at the receiving end of the action. */
	recipient?: Organization | Audience | ContactPoint | Person
}
