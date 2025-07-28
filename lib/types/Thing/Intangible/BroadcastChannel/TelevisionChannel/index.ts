import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

export interface TelevisionChannelProps {}

type TelevisionChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& TelevisionChannelProps

export default TelevisionChannel
