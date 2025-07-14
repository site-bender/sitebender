import AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import AnatomicalStructure from "../..//index.ts"
import Vessel from "../index.ts"

export default interface LymphaticVessel extends Vessel {
	/** The vasculature the lymphatic structure originates, or afferents, from. */
	originatesFrom?: Vessel
	/** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
	regionDrained?: AnatomicalStructure | AnatomicalSystem
	/** The vasculature the lymphatic structure runs, or efferents, to. */
	runsTo?: Vessel
}
