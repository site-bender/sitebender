// Vessel extends AnatomicalStructure but adds no additional properties
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VesselProps {}

type Vessel =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& VesselProps

export default Vessel
