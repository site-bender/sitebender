import type Event from "../../../../Event/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import EventComponent from "../../../../../../components/Thing/Event/index.ts"

export interface InformActionProps {
	"@type"?: "InformAction"
	event?: Event | ReturnType<typeof EventComponent>
}

type InformAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps

export default InformAction
