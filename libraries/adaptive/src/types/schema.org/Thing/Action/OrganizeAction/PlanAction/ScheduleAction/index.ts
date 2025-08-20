import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

export type ScheduleActionType = "ScheduleAction"

export interface ScheduleActionProps {
	"@type"?: ScheduleActionType
}

type ScheduleAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& ScheduleActionProps

export default ScheduleAction
