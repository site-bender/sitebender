import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type AnatomicalStructure from "../index.ts"
import type Nerve from "../Nerve/index.ts"
import type Vessel from "../Vessel/index.ts"

export interface MuscleProps {
	antagonist?: Muscle
	bloodSupply?: Vessel
	insertion?: AnatomicalStructure
	muscleAction?: Text
	nerve?: Nerve
}

type Muscle =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& MuscleProps

export default Muscle
