import { Text } from "../../../DataType/index.ts"
import DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import BioChemEntity from "../index.ts"

export default interface ChemicalSubstance extends BioChemEntity {
	/** The chemical composition describes the identity and relative ratio of the chemical elements that make up the substance. */
	chemicalComposition?: Text
	/** A role played by the BioChemEntity within a chemical context. */
	chemicalRole?: DefinedTerm
	/** Intended use of the BioChemEntity by humans. */
	potentialUse?: DefinedTerm
}
