import Event from "../../../Event/index.ts"
import InteractAction from "../index.ts"

export default interface JoinAction extends InteractAction {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}
