import Event from "../../Event/index.ts"
import Audience from "../../Intangible/Audience/index.ts"
import Action from "../index.ts"

export default interface PlayAction extends Action {
	/** An intended audience, i.e. a group for whom something was created. */
	audience?: Audience
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}
