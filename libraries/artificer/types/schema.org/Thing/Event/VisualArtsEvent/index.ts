import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type VisualArtsEventType = "VisualArtsEvent"

export interface VisualArtsEventProps {
	"@type"?: VisualArtsEventType
}

type VisualArtsEvent = Thing & EventProps & VisualArtsEventProps

export default VisualArtsEvent
