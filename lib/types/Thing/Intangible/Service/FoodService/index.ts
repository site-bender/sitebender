import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface FoodServiceProps {
	"@type"?: "FoodService"}

type FoodService = Thing & IntangibleProps & ServiceProps & FoodServiceProps

export default FoodService
