import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import type BrainStructure from "../BrainStructure/index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Muscle from "../Muscle/index.ts"

import BrainStructureComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/BrainStructure/index.ts"
import AnatomicalStructureComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import MuscleComponent from "../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.ts"
import SuperficialAnatomyComponent from "../../../../../components/Thing/MedicalEntity/SuperficialAnatomy/index.ts"

export interface NerveProps {
	branch?: AnatomicalStructure | ReturnType<typeof AnatomicalStructureComponent>
	nerveMotor?: Muscle | ReturnType<typeof MuscleComponent>
	sensoryUnit?:
		| AnatomicalStructure
		| SuperficialAnatomy
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof SuperficialAnatomyComponent>
	sourcedFrom?: BrainStructure | ReturnType<typeof BrainStructureComponent>
}

type Nerve = Thing & MedicalEntityProps & AnatomicalStructureProps & NerveProps

export default Nerve
