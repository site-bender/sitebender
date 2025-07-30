import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

export interface OnDemandEventProps {
	"@type"?: "OnDemandEvent"}

type OnDemandEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& OnDemandEventProps

export default OnDemandEvent
