import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import type BrainStructure from "../BrainStructure/index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Muscle from "../Muscle/index.ts"

import BrainStructureComponent from "../../../../../../src/define/Thing/MedicalEntity/AnatomicalStructure/BrainStructure/index.tsx"
import AnatomicalStructureComponent from "../../../../../../src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import MuscleComponent from "../../../../../../src/define/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.tsx"
import SuperficialAnatomyComponent from "../../../../../../src/define/Thing/MedicalEntity/SuperficialAnatomy/index.tsx"

export type NerveType = "Nerve"

export interface NerveProps {
	"@type"?: NerveType
	branch?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
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
