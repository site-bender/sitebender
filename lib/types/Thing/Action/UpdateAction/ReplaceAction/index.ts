import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

export interface ReplaceActionProps {
	/** A sub property of object. The object that is being replaced. */
	replacee?: Thing
	/** A sub property of object. The object that replaces. */
	replacer?: Thing
}

type ReplaceAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& ReplaceActionProps

export default ReplaceAction
