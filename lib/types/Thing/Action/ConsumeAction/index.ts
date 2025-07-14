import ActionAccessSpecification from "../../Intangible/ActionAccessSpecification/index.ts"
import Offer from "../../Intangible/Offer/index.ts"
import Action from "../index.ts"

export default interface ConsumeAction extends Action {
	/** A set of requirements that must be fulfilled in order to perform an Action. If more than one value is specified, fulfilling one set of requirements will allow the Action to be performed. */
	actionAccessibilityRequirement?: ActionAccessSpecification
	/** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
	expectsAcceptanceOf?: Offer
}
