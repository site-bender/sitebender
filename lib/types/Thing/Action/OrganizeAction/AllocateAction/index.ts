import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"
import type { AcceptActionType } from "./AcceptAction/index.ts"
import type { AssignActionType } from "./AssignAction/index.ts"
import type { AuthorizeActionType } from "./AuthorizeAction/index.ts"
import type { RejectActionType } from "./RejectAction/index.ts"

export type AllocateActionType =
	| "AllocateAction"
	| AuthorizeActionType
	| RejectActionType
	| AcceptActionType
	| AssignActionType

export interface AllocateActionProps {
	"@type"?: AllocateActionType
}

type AllocateAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps

export default AllocateAction
