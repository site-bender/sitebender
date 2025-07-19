import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BioChemEntity from "../index.ts"
import type { BioChemEntityProps } from "../index.ts"

export interface ProteinProps {
	/** A symbolic representation of a BioChemEntity. For example, a nucleotide sequence of a Gene or an amino acid sequence of a Protein. */
	hasBioPolymerSequence?: Text
}

type Protein =
	& Thing
	& BioChemEntityProps
	& ProteinProps

export default Protein
