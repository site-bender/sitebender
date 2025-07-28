import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import FoodEventComponent from "../../../../../components/Thing/Event/FoodEvent/index.tsx"

export interface FoodEventProps {
}

type FoodEvent =
	& Thing
	& EventProps
	& FoodEventProps

export default FoodEvent
