import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type LiteraryEventType = "LiteraryEvent"

export interface LiteraryEventProps {
	"@type"?: LiteraryEventType
}

type LiteraryEvent = Thing & EventProps & LiteraryEventProps

export default LiteraryEvent
