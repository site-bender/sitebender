import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

export interface RadioChannelProps {}

type RadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps

export default RadioChannel
