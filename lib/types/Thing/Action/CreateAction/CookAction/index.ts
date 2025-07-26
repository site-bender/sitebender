import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"
import type FoodEstablishment from "../../../Organization/LocalBusiness/FoodEstablishment/index.ts"
import type FoodEvent from "../../../Event/FoodEvent/index.ts"
import type Place from "../../../Place/index.ts"
import type Recipe from "../../../CreativeWork/HowTo/Recipe/index.ts"

export interface CookActionProps {
	foodEstablishment?: FoodEstablishment | Place
	foodEvent?: FoodEvent
	recipe?: Recipe
}

type CookAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& CookActionProps

export default CookAction
