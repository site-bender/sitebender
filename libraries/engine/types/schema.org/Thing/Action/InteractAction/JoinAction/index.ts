import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import { Event as EventComponent } from "../../../../../../components/index.tsx"

export type JoinActionType = "JoinAction"

export interface JoinActionProps {
	"@type"?: JoinActionType
	event?: Event | ReturnType<typeof EventComponent>
}

type JoinAction = Thing & ActionProps & InteractActionProps & JoinActionProps

export default JoinAction
