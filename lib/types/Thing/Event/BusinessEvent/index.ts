import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import BusinessEventComponent from "../../../../../components/Thing/Event/BusinessEvent/index.tsx"

export interface BusinessEventProps {
}

type BusinessEvent =
	& Thing
	& EventProps
	& BusinessEventProps

export default BusinessEvent
