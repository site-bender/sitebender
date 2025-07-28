import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import MusicEventComponent from "../../../../../components/Thing/Event/MusicEvent/index.tsx"

export interface MusicEventProps {
}

type MusicEvent =
	& Thing
	& EventProps
	& MusicEventProps

export default MusicEvent
