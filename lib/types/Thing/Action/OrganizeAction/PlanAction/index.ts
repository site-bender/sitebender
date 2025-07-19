import type { Date, DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export interface PlanActionProps {
	/** The time the object is scheduled to. */
	scheduledTime?: Date | DateTime
}

type PlanAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps

export default PlanAction
