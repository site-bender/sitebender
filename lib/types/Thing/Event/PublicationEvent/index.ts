import type { Boolean } from "../../../DataType/index.ts"
import type BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Event from "../index.ts"

export default interface PublicationEvent extends Event {
	/** A flag to signal that the item, event, or place is accessible for free. */
	free?: Boolean
	/** An agent associated with the publication event. */
	publishedBy?: Person | Organization
	/** A broadcast service associated with the publication event. */
	publishedOn?: BroadcastService
}
