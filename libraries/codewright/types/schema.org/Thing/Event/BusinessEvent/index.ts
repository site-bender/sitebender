import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type BusinessEventType = "BusinessEvent"

export interface BusinessEventProps {
	"@type"?: BusinessEventType
}

type BusinessEvent = Thing & EventProps & BusinessEventProps

export default BusinessEvent
