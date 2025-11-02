import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type ContactPoint from "../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { EmailMessageType } from "./EmailMessage/index.ts"

import CreativeWorkComponent from "../../../../../src/define/Thing/CreativeWork/index.tsx"
import AudienceComponent from "../../../../../src/define/Thing/Intangible/Audience/index.tsx"
import ContactPointComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"

export type MessageType = "Message" | EmailMessageType

export interface MessageProps {
	"@type"?: MessageType
	bccRecipient?:
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	ccRecipient?:
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	dateRead?: Date | DateTime
	dateReceived?: DateTime
	dateSent?: DateTime
	messageAttachment?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	recipient?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	sender?:
		| Audience
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	toRecipient?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Message = Thing & CreativeWorkProps & MessageProps

export default Message
