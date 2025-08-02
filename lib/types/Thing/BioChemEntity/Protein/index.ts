import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { BioChemEntityProps } from "../index.ts"

export type ProteinType = "Protein"

export interface ProteinProps {
	"@type"?: ProteinType
	hasBioPolymerSequence?: Text
}

type Protein = Thing & BioChemEntityProps & ProteinProps

export default Protein
