// AMRadioChannel extends RadioChannel but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AMRadioChannelProps {}

type AMRadioChannel =
	& Thing
	& BroadcastChannelProps
	& IntangibleProps
	& RadioChannelProps
	& AMRadioChannelProps

export default AMRadioChannel
