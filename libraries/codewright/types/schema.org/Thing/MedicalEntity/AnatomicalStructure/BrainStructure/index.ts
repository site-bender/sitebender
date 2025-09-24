import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export type BrainStructureType = "BrainStructure"

export interface BrainStructureProps {
	"@type"?: BrainStructureType
}

type BrainStructure =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& BrainStructureProps

export default BrainStructure
