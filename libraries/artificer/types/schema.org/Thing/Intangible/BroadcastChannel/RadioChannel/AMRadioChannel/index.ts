import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

export type AMRadioChannelType = "AMRadioChannel"

export interface AMRadioChannelProps {
	"@type"?: AMRadioChannelType
}

type AMRadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps
	& AMRadioChannelProps

export default AMRadioChannel
