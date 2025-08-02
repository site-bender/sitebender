import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type TheaterEventType = "TheaterEvent"

export interface TheaterEventProps {
	"@type"?: TheaterEventType
}

type TheaterEvent = Thing & EventProps & TheaterEventProps

export default TheaterEvent
