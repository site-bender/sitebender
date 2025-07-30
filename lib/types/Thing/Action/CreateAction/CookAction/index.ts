import type Recipe from "../../../CreativeWork/HowTo/Recipe/index.ts"
import type FoodEvent from "../../../Event/FoodEvent/index.ts"
import type Thing from "../../../index.ts"
import type FoodEstablishment from "../../../Organization/LocalBusiness/FoodEstablishment/index.ts"
import type Place from "../../../Place/index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import RecipeComponent from "../../../../../components/Thing/CreativeWork/HowTo/Recipe/index.ts"
import FoodEventComponent from "../../../../../components/Thing/Event/FoodEvent/index.ts"
import FoodEstablishmentComponent from "../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/index.ts"
import PlaceComponent from "../../../../../components/Thing/Place/index.ts"

export interface CookActionProps {
	"@type"?: "CookAction"
	foodEstablishment?:
		| FoodEstablishment
		| Place
		| ReturnType<typeof FoodEstablishmentComponent>
		| ReturnType<typeof PlaceComponent>
	foodEvent?: FoodEvent | ReturnType<typeof FoodEventComponent>
	recipe?: Recipe | ReturnType<typeof RecipeComponent>
}

type CookAction = Thing & ActionProps & CreateActionProps & CookActionProps

export default CookAction
