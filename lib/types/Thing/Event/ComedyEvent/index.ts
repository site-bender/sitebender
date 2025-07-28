import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import ComedyEventComponent from "../../../../../components/Thing/Event/ComedyEvent/index.tsx"

export interface ComedyEventProps {
}

type ComedyEvent =
	& Thing
	& EventProps
	& ComedyEventProps

export default ComedyEvent
