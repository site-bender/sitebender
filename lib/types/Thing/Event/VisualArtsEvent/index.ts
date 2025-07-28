import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import VisualArtsEventComponent from "../../../../../components/Thing/Event/VisualArtsEvent/index.tsx"

export interface VisualArtsEventProps {
}

type VisualArtsEvent =
	& Thing
	& EventProps
	& VisualArtsEventProps

export default VisualArtsEvent
