import type Recipe from "../../../CreativeWork/HowTo/Recipe/index.ts"
import type FoodEvent from "../../../Event/FoodEvent/index.ts"
import type FoodEstablishment from "../../../Organization/LocalBusiness/FoodEstablishment/index.ts"
import type Place from "../../../Place/index.ts"
import type CreateAction from "../index.ts"

export default interface CookAction extends CreateAction {
	/** A sub property of location. The specific food establishment where the action occurred. */
	foodEstablishment?: Place | FoodEstablishment
	/** A sub property of location. The specific food event where the action occurred. */
	foodEvent?: FoodEvent
	/** A sub property of instrument. The recipe/instructions used to perform the action. */
	recipe?: Recipe
}
