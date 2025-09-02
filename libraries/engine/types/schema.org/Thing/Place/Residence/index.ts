import type Thing from "../../index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type { PlaceProps } from "../index.ts"
import type { ApartmentComplexType } from "./ApartmentComplex/index.ts"
import type { GatedResidenceCommunityType } from "./GatedResidenceCommunity/index.ts"

import { FloorPlan as FloorPlanComponent } from "../../../../../components/index.tsx"

export type ResidenceType =
	| "Residence"
	| ApartmentComplexType
	| GatedResidenceCommunityType

export interface ResidenceProps {
	"@type"?: ResidenceType
	accommodationFloorPlan?: FloorPlan | ReturnType<typeof FloorPlanComponent>
}

type Residence = Thing & PlaceProps & ResidenceProps

export default Residence
