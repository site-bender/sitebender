import { Text } from "../../../DataType/index.ts"
import DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import AnatomicalStructure from "../../MedicalEntity/AnatomicalStructure/index.ts"
import AnatomicalSystem from "../../MedicalEntity/AnatomicalSystem/index.ts"
import BioChemEntity from "../index.ts"

export default interface Gene extends BioChemEntity {
	/** Another gene which is a variation of this one. */
	alternativeOf?: Gene
	/** Another BioChemEntity encoded by this one. */
	encodesBioChemEntity?: BioChemEntity
	/** Tissue, organ, biological sample, etc in which activity of this gene has been observed experimentally. For example brain, digestive system. */
	expressedIn?:
		| AnatomicalStructure
		| DefinedTerm
		| BioChemEntity
		| AnatomicalSystem
	/** A symbolic representation of a BioChemEntity. For example, a nucleotide sequence of a Gene or an amino acid sequence of a Protein. */
	hasBioPolymerSequence?: Text
}
