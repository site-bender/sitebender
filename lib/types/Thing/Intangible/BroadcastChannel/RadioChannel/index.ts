// RadioChannel extends BroadcastChannel but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RadioChannelProps {}

type RadioChannel =
	& Thing
	& BroadcastChannelProps
	& IntangibleProps
	& RadioChannelProps

export default RadioChannel
