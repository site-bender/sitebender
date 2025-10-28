import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { ActionProps } from "../index.ts"
import type { ExerciseActionType } from "./ExerciseAction/index.ts"
import type { PerformActionType } from "./PerformAction/index.ts"

import EventComponent from "../../../../../../architect/src/define/Thing/Event/index.tsx"
import AudienceComponent from "../../../../../../architect/src/define/Thing/Intangible/Audience/index.tsx"

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
