import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { ActionProps } from "../index.ts"
import type { ArriveActionType } from "./ArriveAction/index.ts"
import type { DepartActionType } from "./DepartAction/index.ts"
import type { TravelActionType } from "./TravelAction/index.ts"

import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export type MoveActionType =
	| "MoveAction"
	| DepartActionType
	| TravelActionType
	| ArriveActionType

export interface MoveActionProps {
	"@type"?: MoveActionType
	fromLocation?: Place | ReturnType<typeof PlaceComponent>
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type MoveAction = Thing & ActionProps & MoveActionProps

export default MoveAction
