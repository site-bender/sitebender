import type Event from "../../../Event/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import EventComponent from "../../../../../components/Thing/Event/index.ts"

export interface JoinActionProps {
	event?: Event | ReturnType<typeof EventComponent>
}

type JoinAction = Thing & ActionProps & InteractActionProps & JoinActionProps

export default JoinAction
