import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

export type CancelActionType = "CancelAction"

export interface CancelActionProps {
	"@type"?: CancelActionType
}

type CancelAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& CancelActionProps

export default CancelAction
