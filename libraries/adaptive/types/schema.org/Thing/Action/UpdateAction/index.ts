import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { AddActionType } from "./AddAction/index.ts"
import type { DeleteActionType } from "./DeleteAction/index.ts"
import type { ReplaceActionType } from "./ReplaceAction/index.ts"

import { Thing as ThingComponent } from "../../../../../components/index.tsx"

export type UpdateActionType =
	| "UpdateAction"
	| ReplaceActionType
	| DeleteActionType
	| AddActionType

export interface UpdateActionProps {
	"@type"?: UpdateActionType
	collection?: Thing | ReturnType<typeof ThingComponent>
	targetCollection?: Thing | ReturnType<typeof ThingComponent>
}

type UpdateAction = Thing & ActionProps & UpdateActionProps

export default UpdateAction
