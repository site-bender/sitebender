// FMRadioChannel extends RadioChannel but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface FMRadioChannelProps {}

type FMRadioChannel =
	& Thing
	& BroadcastChannelProps
	& IntangibleProps
	& RadioChannelProps
	& FMRadioChannelProps

export default FMRadioChannel
