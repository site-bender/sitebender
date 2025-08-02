import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type MusicEventType = "MusicEvent"

export interface MusicEventProps {
	"@type"?: MusicEventType
}

type MusicEvent = Thing & EventProps & MusicEventProps

export default MusicEvent
