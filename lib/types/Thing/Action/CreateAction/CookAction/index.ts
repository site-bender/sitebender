import Recipe from "../../../CreativeWork/HowTo/Recipe/index.ts"
import FoodEvent from "../../../Event/FoodEvent/index.ts"
import FoodEstablishment from "../../../Organization/LocalBusiness/FoodEstablishment/index.ts"
import Place from "../../../Place/index.ts"
import CreateAction from "../index.ts"

export default interface CookAction extends CreateAction {
	/** A sub property of location. The specific food establishment where the action occurred. */
	foodEstablishment?: Place | FoodEstablishment
	/** A sub property of location. The specific food event where the action occurred. */
	foodEvent?: FoodEvent
	/** A sub property of instrument. The recipe/instructions used to perform the action. */
	recipe?: Recipe
}
