import type Place from "../../../../Place/index.ts"
import type AddAction from "../index.ts"

export default interface InsertAction extends AddAction {
	/** A sub property of location. The final location of the object or the agent after the action. */
	toLocation?: Place
}
