import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type ContactPoint from "../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"
import ContactPointComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface MessageProps {
	"@type"?: "Message"
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
