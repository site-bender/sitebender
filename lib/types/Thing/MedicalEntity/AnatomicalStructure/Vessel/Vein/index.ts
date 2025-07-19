import type Thing from "../../../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type Vessel from "../index.ts"
import type { VesselProps } from "../index.ts"

export interface VeinProps {
	/** The vasculature that the vein drains into. */
	drainsTo?: Vessel
	/** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	/** The anatomical or organ system that the vein flows into; a larger structure that the vein connects to. */
	tributary?: AnatomicalStructure
}

type Vein =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& VesselProps
	& VeinProps

export default Vein
