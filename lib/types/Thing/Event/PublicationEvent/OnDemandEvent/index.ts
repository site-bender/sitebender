// OnDemandEvent extends PublicationEvent but adds no additional properties
import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface OnDemandEventProps {}

type OnDemandEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& OnDemandEventProps

export default OnDemandEvent
