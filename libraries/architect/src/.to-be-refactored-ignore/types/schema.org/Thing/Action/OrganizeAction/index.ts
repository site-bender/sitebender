import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { AllocateActionType } from "./AllocateAction/index.ts"
import type { ApplyActionType } from "./ApplyAction/index.ts"
import type { BookmarkActionType } from "./BookmarkAction/index.ts"
import type { PlanActionType } from "./PlanAction/index.ts"

export type OrganizeActionType =
	| "OrganizeAction"
	| PlanActionType
	| BookmarkActionType
	| ApplyActionType
	| AllocateActionType

export interface OrganizeActionProps {
	"@type"?: OrganizeActionType
}

type OrganizeAction = Thing & ActionProps & OrganizeActionProps

export default OrganizeAction
