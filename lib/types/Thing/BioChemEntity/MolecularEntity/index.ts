import { Text } from "../../../DataType/index.ts"
import DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import BioChemEntity from "../index.ts"

export default interface MolecularEntity extends BioChemEntity {
	/** A role played by the BioChemEntity within a chemical context. */
	chemicalRole?: DefinedTerm
	/** Non-proprietary identifier for molecular entity that can be used in printed and electronic data sources thus enabling easier linking of diverse data compilations. */
	inChI?: Text
	/** InChIKey is a hashed version of the full InChI (using the SHA-256 algorithm). */
	inChIKey?: Text
	/** Systematic method of naming chemical compounds as recommended by the International Union of Pure and Applied Chemistry (IUPAC). */
	iupacName?: Text
	/** The empirical formula is the simplest whole number ratio of all the atoms in a molecule. */
	molecularFormula?: Text
	/** This is the molecular weight of the entity being described, not of the parent. Units should be included in the form '&lt;Number&gt; &lt;unit&gt;', for example '12 amu' or as '&lt;QuantitativeValue&gt;. */
	molecularWeight?: Text | QuantitativeValue
	/** The monoisotopic mass is the sum of the masses of the atoms in a molecule using the unbound, ground-state, rest mass of the principal (most abundant) isotope for each element instead of the isotopic average mass. Please include the units in the form '&lt;Number&gt; &lt;unit&gt;', for example '770.230488 g/mol' or as '&lt;QuantitativeValue&gt;. */
	monoisotopicMolecularWeight?: QuantitativeValue | Text
	/** Intended use of the BioChemEntity by humans. */
	potentialUse?: DefinedTerm
	/** A specification in form of a line notation for describing the structure of chemical species using short ASCII strings.  Double bond stereochemistry \ indicators may need to be escaped in the string in formats where the backslash is an escape character. */
	smiles?: Text
}
