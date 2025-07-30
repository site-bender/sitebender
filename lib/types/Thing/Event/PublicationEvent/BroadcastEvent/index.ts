import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type Event from "../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

import EventComponent from "../../../../../components/Thing/Event/index.ts"
import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"

export interface BroadcastEventProps {
	"@type"?: "BroadcastEvent"
	broadcastOfEvent?: Event | ReturnType<typeof EventComponent>
	isLiveBroadcast?: Boolean
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	videoFormat?: Text
}

type BroadcastEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& BroadcastEventProps

export default BroadcastEvent
