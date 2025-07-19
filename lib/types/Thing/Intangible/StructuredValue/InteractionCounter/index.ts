import type Action from "../../../Action/index.ts"
import type SoftwareApplication from "../../../CreativeWork/SoftwareApplication/index.ts"
import type WebSite from "../../../CreativeWork/WebSite/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type VirtualLocation from "../../VirtualLocation/index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface InteractionCounterProps {
	/** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. E.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	endTime?: Time | DateTime
	/** The WebSite or SoftwareApplication where the interactions took place. */
	interactionService?: WebSite | SoftwareApplication
	/** The Action representing the type of interaction. For up votes, +1s, etc. use [[LikeAction]]. For down votes use [[DislikeAction]]. Otherwise, use the most specific Action. */
	interactionType?: Action
	/** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
	location?: VirtualLocation | PostalAddress | Place | Text
	/** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. E.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	startTime?: DateTime | Time
	/** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. */
	userInteractionCount?: Integer
}

type InteractionCounter =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& InteractionCounterProps

export default InteractionCounter
