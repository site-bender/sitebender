import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type BioChemEntity from "../index.ts"
import type { BioChemEntityProps } from "../index.ts"

export interface ChemicalSubstanceProps {
	/** The chemical composition describes the identity and relative ratio of the chemical elements that make up the substance. */
	chemicalComposition?: Text
	/** A role played by the BioChemEntity within a chemical context. */
	chemicalRole?: DefinedTerm
	/** Intended use of the BioChemEntity by humans. */
	potentialUse?: DefinedTerm
}

type ChemicalSubstance =
	& Thing
	& BioChemEntityProps
	& ChemicalSubstanceProps

export default ChemicalSubstance
