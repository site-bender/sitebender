import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import EventComponent from "../../../../../../../pagewright/src/define/Thing/Event/index.tsx"

export type JoinActionType = "JoinAction"

export interface JoinActionProps {
	"@type"?: JoinActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type JoinAction = Thing & ActionProps & InteractActionProps & JoinActionProps

export default JoinAction
