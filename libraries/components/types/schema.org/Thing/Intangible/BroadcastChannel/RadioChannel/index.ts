import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"
import type { AMRadioChannelType } from "./AMRadioChannel/index.ts"
import type { FMRadioChannelType } from "./FMRadioChannel/index.ts"

export type RadioChannelType =
	| "RadioChannel"
	| FMRadioChannelType
	| AMRadioChannelType

export interface RadioChannelProps {
	"@type"?: RadioChannelType
}

type RadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps

export default RadioChannel
