import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type AnatomicalStructure from "../index.ts"
import type BrainStructure from "../BrainStructure/index.ts"
import type Muscle from "../Muscle/index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"

export interface NerveProps {
	branch?: AnatomicalStructure
	nerveMotor?: Muscle
	sensoryUnit?: AnatomicalStructure | SuperficialAnatomy
	sourcedFrom?: BrainStructure
}

type Nerve =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& NerveProps

export default Nerve
