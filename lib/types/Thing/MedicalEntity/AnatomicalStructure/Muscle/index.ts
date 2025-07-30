import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Nerve from "../Nerve/index.ts"
import type Vessel from "../Vessel/index.ts"

import AnatomicalStructureComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import MuscleComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.ts"
import NerveComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Nerve/index.ts"
import VesselComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"

export interface MuscleProps {
	"@type"?: "Muscle"
	antagonist?: Muscle | ReturnType<typeof MuscleComponent>
	bloodSupply?: Vessel | ReturnType<typeof VesselComponent>
	insertion?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
	muscleAction?: Text
	nerve?: Nerve | ReturnType<typeof NerveComponent>
}

type Muscle =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& MuscleProps

export default Muscle
