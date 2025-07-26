import type { Boolean } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

export interface PublicationEventProps {
	free?: Boolean
	publishedBy?: Organization | Person
	publishedOn?: BroadcastService
}

type PublicationEvent =
	& Thing
	& EventProps
	& PublicationEventProps

export default PublicationEvent
