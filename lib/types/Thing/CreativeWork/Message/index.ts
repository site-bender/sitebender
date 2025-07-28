import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type ContactPoint from "../../Intangible/StructuredValue/ContactPoint/index.ts"
import type CreativeWork from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import MessageComponent from "../../../../../components/Thing/CreativeWork/Message/index.tsx"

export interface MessageProps {
	bccRecipient?: ContactPoint | Organization | Person
	ccRecipient?: ContactPoint | Organization | Person
	dateRead?: Date | DateTime
	dateReceived?: DateTime
	dateSent?: DateTime
	messageAttachment?: CreativeWork
	recipient?: Audience | ContactPoint | Organization | Person
	sender?: Audience | Organization | Person
	toRecipient?: Audience | ContactPoint | Organization | Person
}

type Message =
	& Thing
	& CreativeWorkProps
	& MessageProps

export default Message
