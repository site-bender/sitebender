import { Date, DateTime } from "../../../DataType/index.ts"
import Audience from "../../Intangible/Audience/index.ts"
import ContactPoint from "../../Intangible/StructuredValue/ContactPoint/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"

export default interface Message extends CreativeWork {
	/** A sub property of recipient. The recipient blind copied on a message. */
	bccRecipient?: Organization | ContactPoint | Person
	/** A sub property of recipient. The recipient copied on a message. */
	ccRecipient?: Organization | ContactPoint | Person
	/** The date/time at which the message has been read by the recipient if a single recipient exists. */
	dateRead?: DateTime | Date
	/** The date/time the message was received if a single recipient exists. */
	dateReceived?: DateTime
	/** The date/time at which the message was sent. */
	dateSent?: DateTime
	/** A CreativeWork attached to the message. */
	messageAttachment?: CreativeWork
	/** A sub property of participant. The participant who is at the receiving end of the action. */
	recipient?: Organization | Audience | ContactPoint | Person
	/** A sub property of participant. The participant who is at the sending end of the action. */
	sender?: Person | Audience | Organization
	/** A sub property of recipient. The recipient who was directly sent the message. */
	toRecipient?: Audience | Organization | ContactPoint | Person
}
