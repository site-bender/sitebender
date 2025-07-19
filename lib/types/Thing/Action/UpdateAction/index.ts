import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface UpdateActionProps {
	/** A sub property of object. The collection target of the action. */
	collection?: Thing
	/** A sub property of object. The collection target of the action. */
	targetCollection?: Thing
}

type UpdateAction =
	& Thing
	& ActionProps
	& UpdateActionProps

export default UpdateAction
