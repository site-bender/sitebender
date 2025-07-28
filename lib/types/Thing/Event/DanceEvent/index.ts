import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import DanceEventComponent from "../../../../../components/Thing/Event/DanceEvent/index.tsx"

export interface DanceEventProps {
}

type DanceEvent =
	& Thing
	& EventProps
	& DanceEventProps

export default DanceEvent
