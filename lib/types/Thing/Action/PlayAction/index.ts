import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Event from "../../Event/index.ts"

import PlayActionComponent from "../../../../../components/Thing/Action/PlayAction/index.tsx"

export interface PlayActionProps {
	audience?: Audience
	event?: Event
}

type PlayAction =
	& Thing
	& ActionProps
	& PlayActionProps

export default PlayAction
