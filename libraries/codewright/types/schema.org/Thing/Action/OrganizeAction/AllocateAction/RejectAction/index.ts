import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

export type RejectActionType = "RejectAction"

export interface RejectActionProps {
	"@type"?: RejectActionType
}

type RejectAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& RejectActionProps

export default RejectAction
