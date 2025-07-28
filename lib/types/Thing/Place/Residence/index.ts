import type Thing from "../../index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type { PlaceProps } from "../index.ts"

import FloorPlanComponent from "../../../../components/Thing/Intangible/FloorPlan/index.ts"

export interface ResidenceProps {
	accommodationFloorPlan?: FloorPlan | ReturnType<typeof FloorPlanComponent>
}

type Residence = Thing & PlaceProps & ResidenceProps

export default Residence
