import type Event from "../../../../Event/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type { ConfirmActionType } from "./ConfirmAction/index.ts"
import type { RsvpActionType } from "./RsvpAction/index.ts"

import EventComponent from "../../../../../../../src/define/Thing/Event/index.tsx"

export type InformActionType =
	| "InformAction"
	| RsvpActionType
	| ConfirmActionType

export interface InformActionProps {
	"@type"?: InformActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type InformAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps

export default InformAction
