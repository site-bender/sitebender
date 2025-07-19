import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type ContactPoint from "../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface MessageProps {
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

type Message =
	& Thing
	& CreativeWorkProps
	& MessageProps

export default Message
