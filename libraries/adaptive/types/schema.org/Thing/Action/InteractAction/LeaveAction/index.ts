import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import { Event as EventComponent } from "../../../../../../components/index.tsx"

export type LeaveActionType = "LeaveAction"

export interface LeaveActionProps {
	"@type"?: LeaveActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type LeaveAction = Thing & ActionProps & InteractActionProps & LeaveActionProps

export default LeaveAction
