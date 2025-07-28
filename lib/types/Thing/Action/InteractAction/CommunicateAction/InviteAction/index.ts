import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type Event from "../../../../Event/index.ts"

import InviteActionComponent from "../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/InviteAction/index.tsx"

export interface InviteActionProps {
	event?: Event
}

type InviteAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InviteActionProps

export default InviteAction
