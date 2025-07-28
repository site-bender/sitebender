import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type { VesselProps } from "../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type Vessel from "../index.ts"

import VeinComponent from "../../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Vessel/Vein/index.tsx"

export interface VeinProps {
	drainsTo?: Vessel
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	tributary?: AnatomicalStructure
}

type Vein =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& VeinProps

export default Vein
