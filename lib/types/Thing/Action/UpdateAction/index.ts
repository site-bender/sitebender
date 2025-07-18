import type Thing from "../../../index.ts"
import type Action from "../index.ts"

export default interface UpdateAction extends Action {
	/** A sub property of object. The collection target of the action. */
	collection?: Thing
	/** A sub property of object. The collection target of the action. */
	targetCollection?: Thing
}
