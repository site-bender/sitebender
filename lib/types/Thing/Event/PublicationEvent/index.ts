import type { Boolean } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

export interface PublicationEventProps {
	/** A flag to signal that the item, event, or place is accessible for free. */
	free?: Boolean
	/** An agent associated with the publication event. */
	publishedBy?: Person | Organization
	/** A broadcast service associated with the publication event. */
	publishedOn?: BroadcastService
}

type PublicationEvent =
	& Thing
	& EventProps
	& PublicationEventProps

export default PublicationEvent
