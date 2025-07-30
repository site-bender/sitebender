import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface ComedyEventProps {
	"@type"?: "ComedyEvent"}

type ComedyEvent = Thing & EventProps & ComedyEventProps

export default ComedyEvent
