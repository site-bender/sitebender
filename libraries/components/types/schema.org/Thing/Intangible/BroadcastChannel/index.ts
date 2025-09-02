import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BroadcastFrequencySpecification from "../BroadcastFrequencySpecification/index.ts"
import type { IntangibleProps } from "../index.ts"
import type BroadcastService from "../Service/BroadcastService/index.ts"
import type CableOrSatelliteService from "../Service/CableOrSatelliteService/index.ts"
import type { RadioChannelType } from "./RadioChannel/index.ts"
import type { TelevisionChannelType } from "./TelevisionChannel/index.ts"

import { BroadcastFrequencySpecification as BroadcastFrequencySpecificationComponent } from "../../../../../components/index.tsx"
import { BroadcastService as BroadcastServiceComponent } from "../../../../../components/index.tsx"
import { CableOrSatelliteService as CableOrSatelliteServiceComponent } from "../../../../../components/index.tsx"

export type BroadcastChannelType =
	| "BroadcastChannel"
	| RadioChannelType
	| TelevisionChannelType

export interface BroadcastChannelProps {
	"@type"?: BroadcastChannelType
	broadcastChannelId?: Text
	broadcastFrequency?:
		| BroadcastFrequencySpecification
		| Text
		| ReturnType<typeof BroadcastFrequencySpecificationComponent>
	broadcastServiceTier?: Text
	genre?: Text | URL
	inBroadcastLineup?:
		| CableOrSatelliteService
		| ReturnType<typeof CableOrSatelliteServiceComponent>
	providesBroadcastService?:
		| BroadcastService
		| ReturnType<typeof BroadcastServiceComponent>
}

type BroadcastChannel = Thing & IntangibleProps & BroadcastChannelProps

export default BroadcastChannel
