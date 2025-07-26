import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"
import type Event from "../../index.ts"
import type Language from "../../../Intangible/Language/index.ts"

export interface BroadcastEventProps {
	broadcastOfEvent?: Event
	isLiveBroadcast?: Boolean
	subtitleLanguage?: Language | Text
	videoFormat?: Text
}

type BroadcastEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& BroadcastEventProps

export default BroadcastEvent
