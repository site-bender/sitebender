import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export interface JoinActionProps {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}

type JoinAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& JoinActionProps

export default JoinAction
