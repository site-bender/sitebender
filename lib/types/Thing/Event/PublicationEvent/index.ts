import { Boolean } from "../../../DataType/index.ts"
import BroadcastService from "../../Intangible/Service/BroadcastService/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import Event from "../index.ts"

export default interface PublicationEvent extends Event {
	/** A flag to signal that the item, event, or place is accessible for free. */
	free?: Boolean
	/** An agent associated with the publication event. */
	publishedBy?: Person | Organization
	/** A broadcast service associated with the publication event. */
	publishedOn?: BroadcastService
}
