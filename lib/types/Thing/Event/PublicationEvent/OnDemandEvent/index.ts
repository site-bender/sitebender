import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { PublicationEventProps } from "../index.ts"

import OnDemandEventComponent from "../../../../../../components/Thing/Event/PublicationEvent/OnDemandEvent/index.tsx"

export interface OnDemandEventProps {
}

type OnDemandEvent =
	& Thing
	& EventProps
	& PublicationEventProps
	& OnDemandEventProps

export default OnDemandEvent
