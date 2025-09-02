import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type ListenActionType = "ListenAction"

export interface ListenActionProps {
	"@type"?: ListenActionType
}

type ListenAction = Thing & ActionProps & ConsumeActionProps & ListenActionProps

export default ListenAction
