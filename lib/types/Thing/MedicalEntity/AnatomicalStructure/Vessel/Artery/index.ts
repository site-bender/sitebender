import AnatomicalStructure from "../..//index.ts"
import Vessel from "../index.ts"

export default interface Artery extends Vessel {
	/** The branches that comprise the arterial structure. */
	arterialBranch?: AnatomicalStructure
	/** The area to which the artery supplies blood. */
	supplyTo?: AnatomicalStructure
}
