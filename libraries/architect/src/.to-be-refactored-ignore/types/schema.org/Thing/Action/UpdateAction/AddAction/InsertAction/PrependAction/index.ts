import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

export type PrependActionType = "PrependAction"

export interface PrependActionProps {
	"@type"?: PrependActionType
}

type PrependAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps
	& PrependActionProps

export default PrependAction
