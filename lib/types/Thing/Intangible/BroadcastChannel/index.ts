import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BroadcastFrequencySpecification from "../BroadcastFrequencySpecification/index.ts"
import type { IntangibleProps } from "../index.ts"
import type BroadcastService from "../Service/BroadcastService/index.ts"
import type CableOrSatelliteService from "../Service/CableOrSatelliteService/index.ts"

export interface BroadcastChannelProps {
	/** The unique address by which the BroadcastService can be identified in a provider lineup. In US, this is typically a number. */
	broadcastChannelId?: Text
	/** The frequency used for over-the-air broadcasts. Numeric values or simple ranges, e.g. 87-99. In addition a shortcut idiom is supported for frequencies of AM and FM radio channels, e.g. "87 FM". */
	broadcastFrequency?: BroadcastFrequencySpecification | Text
	/** The type of service required to have access to the channel (e.g. Standard or Premium). */
	broadcastServiceTier?: Text
	/** Genre of the creative work, broadcast channel or group. */
	genre?: Text | URL
	/** The CableOrSatelliteService offering the channel. */
	inBroadcastLineup?: CableOrSatelliteService
	/** The BroadcastService offered on this channel. */
	providesBroadcastService?: BroadcastService
}

type BroadcastChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps

export default BroadcastChannel
