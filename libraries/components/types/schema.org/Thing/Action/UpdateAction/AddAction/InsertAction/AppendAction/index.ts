import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

export type AppendActionType = "AppendAction"

export interface AppendActionProps {
	"@type"?: AppendActionType
}

type AppendAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps
	& AppendActionProps

export default AppendAction
