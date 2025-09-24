import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

export type OnDemandEventType = "OnDemandEvent"

export interface OnDemandEventProps {
	"@type"?: OnDemandEventType
}

type OnDemandEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& OnDemandEventProps

export default OnDemandEvent
