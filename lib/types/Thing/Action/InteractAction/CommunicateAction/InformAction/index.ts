import type Event from "../../../../Event/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface InformActionProps {
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}

type InformAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& InformActionProps

export default InformAction
