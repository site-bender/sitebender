import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { BioChemEntityProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import MolecularEntityComponent from "../../../../../components/Thing/BioChemEntity/MolecularEntity/index.tsx"

export interface MolecularEntityProps {
	chemicalRole?: DefinedTerm
	inChI?: Text
	inChIKey?: Text
	iupacName?: Text
	molecularFormula?: Text
	molecularWeight?: QuantitativeValue | Text
	monoisotopicMolecularWeight?: QuantitativeValue | Text
	potentialUse?: DefinedTerm
	smiles?: Text
}

type MolecularEntity =
	& Thing
	& BioChemEntityProps
	& MolecularEntityProps

export default MolecularEntity
