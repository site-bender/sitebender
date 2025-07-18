import type Distance from "../../../Intangible/Quantity/Distance/index.ts"
import type MoveAction from "../index.ts"

export default interface TravelAction extends MoveAction {
	/** The distance travelled, e.g. exercising or travelling. */
	distance?: Distance
}
