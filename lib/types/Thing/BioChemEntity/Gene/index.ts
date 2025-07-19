import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type AnatomicalStructure from "../../MedicalEntity/AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../MedicalEntity/AnatomicalSystem/index.ts"
import type BioChemEntity from "../index.ts"
import type { BioChemEntityProps } from "../index.ts"

export interface GeneProps {
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

type Gene =
	& Thing
	& BioChemEntityProps
	& GeneProps

export default Gene
