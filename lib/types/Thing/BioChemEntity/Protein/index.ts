import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { BioChemEntityProps } from "../index.ts"

export interface ProteinProps {
	hasBioPolymerSequence?: Text
}

type Protein = Thing & BioChemEntityProps & ProteinProps

export default Protein
