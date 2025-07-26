import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface MusicEventProps {
}

type MusicEvent =
	& Thing
	& EventProps
	& MusicEventProps

export default MusicEvent
