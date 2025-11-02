import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { BroadcastServiceProps } from "../index.ts"

export type RadioBroadcastServiceType = "RadioBroadcastService"

export interface RadioBroadcastServiceProps {
	"@type"?: RadioBroadcastServiceType
}

type RadioBroadcastService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& BroadcastServiceProps
	& RadioBroadcastServiceProps

export default RadioBroadcastService
