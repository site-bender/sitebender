import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { ActionProps } from "../index.ts"

export interface PlayActionProps {
	/** An intended audience, i.e. a group for whom something was created. */
	audience?: Audience
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
}

type PlayAction =
	& Thing
	& ActionProps
	& PlayActionProps

export default PlayAction
