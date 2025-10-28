import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type ExhibitionEventType = "ExhibitionEvent"

export interface ExhibitionEventProps {
	"@type"?: ExhibitionEventType
}

type ExhibitionEvent = Thing & EventProps & ExhibitionEventProps

export default ExhibitionEvent
