import type { Boolean } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"
import type { BroadcastEventType } from "./BroadcastEvent/index.ts"
import type { OnDemandEventType } from "./OnDemandEvent/index.ts"

import BroadcastServiceComponent from "../../../../components/Thing/Intangible/Service/BroadcastService/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export type PublicationEventType =
	| "PublicationEvent"
	| BroadcastEventType
	| OnDemandEventType

export interface PublicationEventProps {
	"@type"?: PublicationEventType
	free?: Boolean
	publishedBy?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	publishedOn?: BroadcastService | ReturnType<typeof BroadcastServiceComponent>
}

type PublicationEvent = Thing & EventProps & PublicationEventProps

export default PublicationEvent
