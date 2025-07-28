import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

import BrainStructureComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/BrainStructure/index.tsx"

export interface BrainStructureProps {
}

type BrainStructure =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& BrainStructureProps

export default BrainStructure
