import { Text } from "../../../../DataType/index.ts"
import AnatomicalStructure from "../index.ts"
import Nerve from "../Nerve/index.ts"
import Vessel from "../Vessel/index.ts"

export default interface Muscle extends AnatomicalStructure {
	/** The muscle whose action counteracts the specified muscle. */
	antagonist?: Muscle
	/** The blood vessel that carries blood from the heart to the muscle. */
	bloodSupply?: Vessel
	/** The place of attachment of a muscle, or what the muscle moves. */
	insertion?: AnatomicalStructure
	/** The movement the muscle generates. */
	muscleAction?: Text
	/** The underlying innervation associated with the muscle. */
	nerve?: Nerve
}
