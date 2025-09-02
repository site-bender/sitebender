import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

import { Thing as ThingComponent } from "../../../../../../components/index.tsx"

export type ReplaceActionType = "ReplaceAction"

export interface ReplaceActionProps {
	"@type"?: ReplaceActionType
	replacee?: Thing | ReturnType<typeof ThingComponent>
	replacer?: Thing | ReturnType<typeof ThingComponent>
}

type ReplaceAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& ReplaceActionProps

export default ReplaceAction
