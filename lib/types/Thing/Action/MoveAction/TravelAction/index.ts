import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"
import type Distance from "../../../Intangible/Quantity/Distance/index.ts"

export interface TravelActionProps {
	distance?: Distance
}

type TravelAction =
	& Thing
	& ActionProps
	& MoveActionProps
	& TravelActionProps

export default TravelAction
