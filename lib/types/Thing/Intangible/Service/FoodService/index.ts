import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export type FoodServiceType = "FoodService"

export interface FoodServiceProps {
	"@type"?: FoodServiceType
}

type FoodService = Thing & IntangibleProps & ServiceProps & FoodServiceProps

export default FoodService
