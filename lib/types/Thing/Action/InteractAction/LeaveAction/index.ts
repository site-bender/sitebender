import type Event from "../../../Event/index.ts"
import type InteractAction from "../index.ts"

export default interface LeaveAction extends InteractAction {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}
