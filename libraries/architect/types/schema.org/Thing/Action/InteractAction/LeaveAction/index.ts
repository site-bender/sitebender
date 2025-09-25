import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import EventComponent from "../../../../../../../pagewright/src/define/Thing/Event/index.tsx"

export type LeaveActionType = "LeaveAction"

export interface LeaveActionProps {
	"@type"?: LeaveActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type LeaveAction = Thing & ActionProps & InteractActionProps & LeaveActionProps

export default LeaveAction
