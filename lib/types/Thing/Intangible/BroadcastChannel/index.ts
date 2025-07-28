import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type BroadcastFrequencySpecification from "../BroadcastFrequencySpecification/index.ts"
import type BroadcastService from "../Service/BroadcastService/index.ts"
import type CableOrSatelliteService from "../Service/CableOrSatelliteService/index.ts"

import BroadcastChannelComponent from "../../../../../components/Thing/Intangible/BroadcastChannel/index.tsx"

export interface BroadcastChannelProps {
	broadcastChannelId?: Text
	broadcastFrequency?: BroadcastFrequencySpecification | Text
	broadcastServiceTier?: Text
	genre?: Text | URL
	inBroadcastLineup?: CableOrSatelliteService
	providesBroadcastService?: BroadcastService
}

type BroadcastChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps

export default BroadcastChannel
