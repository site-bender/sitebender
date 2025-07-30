import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

export interface DeleteActionProps {
	"@type"?: "DeleteAction"}

type DeleteAction = Thing & ActionProps & UpdateActionProps & DeleteActionProps

export default DeleteAction
