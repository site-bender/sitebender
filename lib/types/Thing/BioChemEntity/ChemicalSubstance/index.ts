import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { BioChemEntityProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

export interface ChemicalSubstanceProps {
	chemicalComposition?: Text
	chemicalRole?: DefinedTerm
	potentialUse?: DefinedTerm
}

type ChemicalSubstance =
	& Thing
	& BioChemEntityProps
	& ChemicalSubstanceProps

export default ChemicalSubstance
