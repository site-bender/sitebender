import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

export interface ReplaceActionProps {
	replacee?: Thing
	replacer?: Thing
}

type ReplaceAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& ReplaceActionProps

export default ReplaceAction
