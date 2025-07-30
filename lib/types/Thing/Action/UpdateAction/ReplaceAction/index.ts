import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

import ThingComponent from "../../../../../components/Thing/index.ts"

export interface ReplaceActionProps {
	"@type"?: "ReplaceAction"
	replacee?: Thing | ReturnType<typeof ThingComponent>
	replacer?: Thing | ReturnType<typeof ThingComponent>
}

type ReplaceAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& ReplaceActionProps

export default ReplaceAction
