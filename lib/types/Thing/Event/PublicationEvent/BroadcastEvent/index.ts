import type { Language } from "../../../../bcp47/index.ts"
import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Event from "../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

export interface BroadcastEventProps {
	/** The event being broadcast such as a sporting event or awards ceremony. */
	broadcastOfEvent?: Event
	/** True if the broadcast is of a live event. */
	isLiveBroadcast?: Boolean
	/** Languages in which subtitles/captions are available, in [IETF BCP 47 standard format](http://tools.ietf.org/html/bcp47). */
	subtitleLanguage?: Language | Text
	/** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
	videoFormat?: Text
}

type BroadcastEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& BroadcastEventProps

export default BroadcastEvent
