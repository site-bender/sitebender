import type Thing from "../../../index.ts"
import type Distance from "../../../Intangible/Quantity/Distance/index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

import DistanceComponent from "../../../../../../../architect/src/define/Thing/Intangible/Quantity/Distance/index.tsx"

export type TravelActionType = "TravelAction"

export interface TravelActionProps {
	"@type"?: TravelActionType
	distance?: Distance | ReturnType<typeof DistanceComponent>
}

type TravelAction = Thing & ActionProps & MoveActionProps & TravelActionProps

export default TravelAction
