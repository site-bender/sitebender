import FloorPlan from "../../Intangible/FloorPlan/index.ts"
import Place from "../index.ts"

export default interface Residence extends Place {
	/** A floorplan of some [[Accommodation]]. */
	accommodationFloorPlan?: FloorPlan
}
