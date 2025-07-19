import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export interface LeaveActionProps {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}

type LeaveAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& LeaveActionProps

export default LeaveAction
