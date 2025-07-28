import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import ExhibitionEventComponent from "../../../../../components/Thing/Event/ExhibitionEvent/index.tsx"

export interface ExhibitionEventProps {
}

type ExhibitionEvent =
	& Thing
	& EventProps
	& ExhibitionEventProps

export default ExhibitionEvent
