import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type { VesselProps } from "../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type Vessel from "../index.ts"

export interface LymphaticVesselProps {
	originatesFrom?: Vessel
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	runsTo?: Vessel
}

type LymphaticVessel =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& LymphaticVesselProps

export default LymphaticVessel
