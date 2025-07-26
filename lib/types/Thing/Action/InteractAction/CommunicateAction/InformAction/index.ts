import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type Event from "../../../../Event/index.ts"

export interface InformActionProps {
	event?: Event
}

type InformAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps

export default InformAction
