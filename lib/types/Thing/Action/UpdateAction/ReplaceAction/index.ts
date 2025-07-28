import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

import ReplaceActionComponent from "../../../../../../components/Thing/Action/UpdateAction/ReplaceAction/index.tsx"

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
