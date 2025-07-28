import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

import VesselComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.tsx"

export interface VesselProps {
}

type Vessel =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps

export default Vessel
