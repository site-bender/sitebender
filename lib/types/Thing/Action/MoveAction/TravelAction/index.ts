import type Thing from "../../../index.ts"
import type Distance from "../../../Intangible/Quantity/Distance/index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

export interface TravelActionProps {
	/** The distance travelled, e.g. exercising or travelling. */
	distance?: Distance
}

type TravelAction =
	& Thing
	& ActionProps
	& MoveActionProps
	& TravelActionProps

export default TravelAction
