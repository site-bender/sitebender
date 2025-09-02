import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

export type AssignActionType = "AssignAction"

export interface AssignActionProps {
	"@type"?: AssignActionType
}

type AssignAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AssignActionProps

export default AssignAction
