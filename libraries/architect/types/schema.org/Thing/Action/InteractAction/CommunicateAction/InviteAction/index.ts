import type Event from "../../../../Event/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import EventComponent from "../../../../../../../../codewright/src/define/Thing/Event/index.tsx"

export type InviteActionType = "InviteAction"

export interface InviteActionProps {
	"@type"?: InviteActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type InviteAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InviteActionProps

export default InviteAction
