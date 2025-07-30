import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import EventComponent from "../../../../../components/Thing/Event/index.ts"

export interface LeaveActionProps {
	"@type"?: "LeaveAction"
	event?: Event | ReturnType<typeof EventComponent>
}

type LeaveAction = Thing & ActionProps & InteractActionProps & LeaveActionProps

export default LeaveAction
