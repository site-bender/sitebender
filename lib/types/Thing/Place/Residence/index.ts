import type Thing from "../../index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type { PlaceProps } from "../index.ts"

export interface ResidenceProps {
	/** A floorplan of some [[Accommodation]]. */
	accommodationFloorPlan?: FloorPlan
}

type Residence =
	& Thing
	& PlaceProps
	& ResidenceProps

export default Residence
