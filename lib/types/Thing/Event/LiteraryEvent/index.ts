import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import LiteraryEventComponent from "../../../../../components/Thing/Event/LiteraryEvent/index.tsx"

export interface LiteraryEventProps {
}

type LiteraryEvent =
	& Thing
	& EventProps
	& LiteraryEventProps

export default LiteraryEvent
