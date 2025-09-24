import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { BioChemEntityProps } from "../index.ts"

import DefinedTermComponent from "../../../../../src/define/Thing/Intangible/DefinedTerm/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type MolecularEntityType = "MolecularEntity"

export interface MolecularEntityProps {
	"@type"?: MolecularEntityType
	chemicalRole?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
	inChI?: Text
	inChIKey?: Text
	iupacName?: Text
	molecularFormula?: Text
	molecularWeight?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	monoisotopicMolecularWeight?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	potentialUse?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
	smiles?: Text
}

type MolecularEntity = Thing & BioChemEntityProps & MolecularEntityProps

export default MolecularEntity
