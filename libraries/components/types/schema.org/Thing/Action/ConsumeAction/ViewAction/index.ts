import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type ViewActionType = "ViewAction"

export interface ViewActionProps {
	"@type"?: ViewActionType
}

type ViewAction = Thing & ActionProps & ConsumeActionProps & ViewActionProps

export default ViewAction
