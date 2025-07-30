import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface BusinessEventProps {
	"@type"?: "BusinessEvent"}

type BusinessEvent = Thing & EventProps & BusinessEventProps

export default BusinessEvent
