import SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import BrainStructure from "../BrainStructure/index.ts"
import AnatomicalStructure from "../index.ts"
import Muscle from "../Muscle/index.ts"

export default interface Nerve extends AnatomicalStructure {
	/** The branches that delineate from the nerve bundle. Not to be confused with [[branchOf]]. */
	branch?: AnatomicalStructure
	/** The neurological pathway extension that involves muscle control. */
	nerveMotor?: Muscle
	/** The neurological pathway extension that inputs and sends information to the brain or spinal cord. */
	sensoryUnit?: AnatomicalStructure | SuperficialAnatomy
	/** The neurological pathway that originates the neurons. */
	sourcedFrom?: BrainStructure
}
