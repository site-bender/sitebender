import type Recipe from "../../../CreativeWork/HowTo/Recipe/index.ts"
import type FoodEvent from "../../../Event/FoodEvent/index.ts"
import type Thing from "../../../index.ts"
import type FoodEstablishment from "../../../Organization/LocalBusiness/FoodEstablishment/index.ts"
import type Place from "../../../Place/index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import RecipeComponent from "../../../../../../src/define/Thing/CreativeWork/HowTo/Recipe/index.tsx"
import FoodEventComponent from "../../../../../../src/define/Thing/Event/FoodEvent/index.tsx"
import FoodEstablishmentComponent from "../../../../../../src/define/Thing/Organization/LocalBusiness/FoodEstablishment/index.tsx"
import PlaceComponent from "../../../../../../src/define/Thing/Place/index.tsx"

export type CookActionType = "CookAction"

export interface CookActionProps {
	"@type"?: CookActionType
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
