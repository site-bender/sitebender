import type { Date, DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"
import type { CancelActionType } from "./CancelAction/index.ts"
import type { ReserveActionType } from "./ReserveAction/index.ts"
import type { ScheduleActionType } from "./ScheduleAction/index.ts"

export type PlanActionType =
	| "PlanAction"
	| CancelActionType
	| ReserveActionType
	| ScheduleActionType

export interface PlanActionProps {
	"@type"?: PlanActionType
	scheduledTime?: Date | DateTime
}

type PlanAction = Thing & ActionProps & OrganizeActionProps & PlanActionProps

export default PlanAction
