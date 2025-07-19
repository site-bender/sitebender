import type Event from "../../../../Event/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface InviteActionProps {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}

type InviteAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& InviteActionProps

export default InviteAction
