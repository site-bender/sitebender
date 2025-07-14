import Audience from "../../../Intangible/Audience/index.ts"
import ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import TransferAction from "../index.ts"

export default interface ReturnAction extends TransferAction {
	/** A sub property of participant. The participant who is at the receiving end of the action. */
	recipient?: Organization | Audience | ContactPoint | Person
}
