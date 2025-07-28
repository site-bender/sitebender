import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import TheaterEventComponent from "../../../../../components/Thing/Event/TheaterEvent/index.tsx"

export interface TheaterEventProps {
}

type TheaterEvent =
	& Thing
	& EventProps
	& TheaterEventProps

export default TheaterEvent
