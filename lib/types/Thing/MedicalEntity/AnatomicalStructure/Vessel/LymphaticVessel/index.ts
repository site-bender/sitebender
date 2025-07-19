import type Thing from "../../../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type Vessel from "../index.ts"
import type { VesselProps } from "../index.ts"

export interface LymphaticVesselProps {
	/** The vasculature the lymphatic structure originates, or afferents, from. */
	originatesFrom?: Vessel
	/** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	/** The vasculature the lymphatic structure runs, or efferents, to. */
	runsTo?: Vessel
}

type LymphaticVessel =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& VesselProps
	& LymphaticVesselProps

export default LymphaticVessel
