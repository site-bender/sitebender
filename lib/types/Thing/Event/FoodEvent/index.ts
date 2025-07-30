import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface FoodEventProps {
	"@type"?: "FoodEvent"}

type FoodEvent = Thing & EventProps & FoodEventProps

export default FoodEvent
