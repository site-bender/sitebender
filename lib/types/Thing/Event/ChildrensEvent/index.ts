import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import ChildrensEventComponent from "../../../../../components/Thing/Event/ChildrensEvent/index.tsx"

export interface ChildrensEventProps {
}

type ChildrensEvent =
	& Thing
	& EventProps
	& ChildrensEventProps

export default ChildrensEvent
