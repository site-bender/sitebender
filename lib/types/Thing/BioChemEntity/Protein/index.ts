import { Text } from "../../../DataType/index.ts"
import BioChemEntity from "../index.ts"

export default interface Protein extends BioChemEntity {
	/** A symbolic representation of a BioChemEntity. For example, a nucleotide sequence of a Gene or an amino acid sequence of a Protein. */
	hasBioPolymerSequence?: Text
}
