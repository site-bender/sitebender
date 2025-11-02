import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type ChildrensEventType = "ChildrensEvent"

export interface ChildrensEventProps {
	"@type"?: ChildrensEventType
}

type ChildrensEvent = Thing & EventProps & ChildrensEventProps

export default ChildrensEvent
