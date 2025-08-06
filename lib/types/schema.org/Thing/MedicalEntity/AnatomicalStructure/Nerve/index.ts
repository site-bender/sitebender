import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import type BrainStructure from "../BrainStructure/index.ts"
import type AnatomicalStructure from "../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type Muscle from "../Muscle/index.ts"

import { BrainStructure as BrainStructureComponent } from "../../../../../../components/index.tsx"
import { AnatomicalStructure as AnatomicalStructureComponent } from "../../../../../../components/index.tsx"
import { Muscle as MuscleComponent } from "../../../../../../components/index.tsx"
import { SuperficialAnatomy as SuperficialAnatomyComponent } from "../../../../../../components/index.tsx"

export type NerveType = "Nerve"

export interface NerveProps {
	"@type"?: NerveType
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
