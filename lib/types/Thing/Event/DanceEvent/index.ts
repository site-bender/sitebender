import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface DanceEventProps {
}

type DanceEvent =
	& Thing
	& EventProps
	& DanceEventProps

export default DanceEvent
