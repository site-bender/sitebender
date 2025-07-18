import type Event from "../../../../Event/index.ts"
import type CommunicateAction from "../index.ts"

export default interface InviteAction extends CommunicateAction {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}
