import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

export type DeleteActionType = "DeleteAction"

export interface DeleteActionProps {
	"@type"?: DeleteActionType
}

type DeleteAction = Thing & ActionProps & UpdateActionProps & DeleteActionProps

export default DeleteAction
