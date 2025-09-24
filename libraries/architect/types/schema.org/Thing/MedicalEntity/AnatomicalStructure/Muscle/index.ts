import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Nerve from "../Nerve/index.ts"
import type Vessel from "../Vessel/index.ts"

import AnatomicalStructureComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import MuscleComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.tsx"
import NerveComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalStructure/Nerve/index.tsx"
import VesselComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.tsx"

export type MuscleType = "Muscle"

export interface MuscleProps {
	"@type"?: MuscleType
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
