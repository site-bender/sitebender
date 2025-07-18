import type { Number } from "../../../../../../DataType/index.ts"
import type Comment from "../../../../../CreativeWork/Comment/index.ts"
import type RsvpResponseType from "../../../../../Intangible/Enumeration/RsvpResponseType/index.ts"
import type InformAction from "../index.ts"

export default interface RsvpAction extends InformAction {
	/** If responding yes, the number of guests who will attend in addition to the invitee. */
	additionalNumberOfGuests?: Number
	/** Comments, typically from users. */
	comment?: Comment
	/** The response (yes, no, maybe) to the RSVP. */
	rsvpResponse?: RsvpResponseType
}
