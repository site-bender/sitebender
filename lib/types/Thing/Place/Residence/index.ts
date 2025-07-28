import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"

import ResidenceComponent from "../../../../../components/Thing/Place/Residence/index.tsx"

export interface ResidenceProps {
	accommodationFloorPlan?: FloorPlan
}

type Residence =
	& Thing
	& PlaceProps
	& ResidenceProps

export default Residence
