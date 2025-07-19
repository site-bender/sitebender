// RadioBroadcastService extends BroadcastService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { BroadcastServiceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RadioBroadcastServiceProps {}

type RadioBroadcastService =
	& Thing
	& BroadcastServiceProps
	& IntangibleProps
	& ServiceProps
	& RadioBroadcastServiceProps

export default RadioBroadcastService
