import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

export type FMRadioChannelType = "FMRadioChannel"

export interface FMRadioChannelProps {
	"@type"?: FMRadioChannelType
}

type FMRadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps
	& FMRadioChannelProps

export default FMRadioChannel
