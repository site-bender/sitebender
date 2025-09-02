import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { ActionProps } from "../index.ts"
import type { ExerciseActionType } from "./ExerciseAction/index.ts"
import type { PerformActionType } from "./PerformAction/index.ts"

import { Audience as AudienceComponent } from "../../../../../components/index.tsx"
import { Event as EventComponent } from "../../../../../components/index.tsx"

export type PlayActionType =
	| "PlayAction"
	| ExerciseActionType
	| PerformActionType

export interface PlayActionProps {
	"@type"?: PlayActionType
	audience?: Audience | ReturnType<typeof AudienceComponent>
	event?: Event | ReturnType<typeof EventComponent>
}

type PlayAction = Thing & ActionProps & PlayActionProps

export default PlayAction
