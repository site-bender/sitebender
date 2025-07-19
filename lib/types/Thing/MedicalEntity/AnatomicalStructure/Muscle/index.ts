import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Nerve from "../Nerve/index.ts"
import type Vessel from "../Vessel/index.ts"

export interface MuscleProps {
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

type Muscle =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& MuscleProps

export default Muscle
