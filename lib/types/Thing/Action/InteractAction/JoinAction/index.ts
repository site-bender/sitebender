import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"
import type Event from "../../../Event/index.ts"

import JoinActionComponent from "../../../../../../components/Thing/Action/InteractAction/JoinAction/index.tsx"

export interface JoinActionProps {
	event?: Event
}

type JoinAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& JoinActionProps

export default JoinAction
