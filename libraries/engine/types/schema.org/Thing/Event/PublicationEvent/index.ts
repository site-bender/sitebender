import type { Boolean } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"
import type { BroadcastEventType } from "./BroadcastEvent/index.ts"
import type { OnDemandEventType } from "./OnDemandEvent/index.ts"

import { BroadcastService as BroadcastServiceComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

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
	publishedOn?:
		| BroadcastService
		| ReturnType<typeof BroadcastServiceComponent>
}

type PublicationEvent = Thing & EventProps & PublicationEventProps

export default PublicationEvent
