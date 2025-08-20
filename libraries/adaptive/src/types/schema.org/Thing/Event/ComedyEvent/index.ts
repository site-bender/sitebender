import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type ComedyEventType = "ComedyEvent"

export interface ComedyEventProps {
	"@type"?: ComedyEventType
}

type ComedyEvent = Thing & EventProps & ComedyEventProps

export default ComedyEvent
