import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type AnatomicalStructure from "../../index.ts"
import type Vessel from "../index.ts"

export default interface Vein extends Vessel {
	/** The vasculature that the vein drains into. */
	drainsTo?: Vessel
	/** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	/** The anatomical or organ system that the vein flows into; a larger structure that the vein connects to. */
	tributary?: AnatomicalStructure
}
