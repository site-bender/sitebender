import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"
import type Event from "../../../Event/index.ts"

import LeaveActionComponent from "../../../../../../components/Thing/Action/InteractAction/LeaveAction/index.tsx"

export interface LeaveActionProps {
	event?: Event
}

type LeaveAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& LeaveActionProps

export default LeaveAction
