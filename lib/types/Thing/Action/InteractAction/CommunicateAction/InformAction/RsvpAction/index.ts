import type { Number } from "../../../../../../DataType/index.ts"
import type Comment from "../../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../../index.ts"
import type RsvpResponseType from "../../../../../Intangible/Enumeration/RsvpResponseType/index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

export interface RsvpActionProps {
	/** If responding yes, the number of guests who will attend in addition to the invitee. */
	additionalNumberOfGuests?: Number
	/** Comments, typically from users. */
	comment?: Comment
	/** The response (yes, no, maybe) to the RSVP. */
	rsvpResponse?: RsvpResponseType
}

type RsvpAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InformActionProps
	& InteractActionProps
	& RsvpActionProps

export default RsvpAction
