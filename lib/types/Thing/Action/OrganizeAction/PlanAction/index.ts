import { Date, DateTime } from "../../../../DataType/index.ts"
import OrganizeAction from "../index.ts"

export default interface PlanAction extends OrganizeAction {
	/** The time the object is scheduled to. */
	scheduledTime?: Date | DateTime
}
