import type Place from "../../Place/index.ts"
import type Action from "../index.ts"

export default interface MoveAction extends Action {
	/** A sub property of location. The original location of the object or the agent before the action. */
	fromLocation?: Place
	/** A sub property of location. The final location of the object or the agent after the action. */
	toLocation?: Place
}
