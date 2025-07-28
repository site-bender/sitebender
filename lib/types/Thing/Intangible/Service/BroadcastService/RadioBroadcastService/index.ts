import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { BroadcastServiceProps } from "../index.ts"

export interface RadioBroadcastServiceProps {}

type RadioBroadcastService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& BroadcastServiceProps
	& RadioBroadcastServiceProps

export default RadioBroadcastService
