import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type DanceEventType = "DanceEvent"

export interface DanceEventProps {
	"@type"?: DanceEventType
}

type DanceEvent = Thing & EventProps & DanceEventProps

export default DanceEvent
