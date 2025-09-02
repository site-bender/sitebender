import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

export type TelevisionChannelType = "TelevisionChannel"

export interface TelevisionChannelProps {
	"@type"?: TelevisionChannelType
}

type TelevisionChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& TelevisionChannelProps

export default TelevisionChannel
