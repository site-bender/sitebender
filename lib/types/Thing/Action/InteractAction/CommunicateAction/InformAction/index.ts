import Event from "../../../../Event/index.ts"
import CommunicateAction from "../index.ts"

export default interface InformAction extends CommunicateAction {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}
