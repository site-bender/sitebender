import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { ActionProps } from "../index.ts"

import EventComponent from "../../../../components/Thing/Event/index.ts"
import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"

export interface PlayActionProps {
	audience?: Audience | ReturnType<typeof AudienceComponent>
	event?: Event | ReturnType<typeof EventComponent>
}

type PlayAction = Thing & ActionProps & PlayActionProps

export default PlayAction
