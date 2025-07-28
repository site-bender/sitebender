import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"
import type BroadcastChannel from "../../BroadcastChannel/index.ts"
import type BroadcastFrequencySpecification from "../../BroadcastFrequencySpecification/index.ts"
import type Language from "../../Language/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Place from "../../../Place/index.ts"

import BroadcastServiceComponent from "../../../../../../components/Thing/Intangible/Service/BroadcastService/index.tsx"

export interface BroadcastServiceProps {
	area?: Place
	broadcastAffiliateOf?: Organization
	broadcastDisplayName?: Text
	broadcaster?: Organization
	broadcastFrequency?: BroadcastFrequencySpecification | Text
	broadcastTimezone?: Text
	callSign?: Text
	hasBroadcastChannel?: BroadcastChannel
	inLanguage?: Language | Text
	parentService?: BroadcastService
	videoFormat?: Text
}

type BroadcastService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& BroadcastServiceProps

export default BroadcastService
