import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type FoodEventType = "FoodEvent"

export interface FoodEventProps {
	"@type"?: FoodEventType
}

type FoodEvent = Thing & EventProps & FoodEventProps

export default FoodEvent
