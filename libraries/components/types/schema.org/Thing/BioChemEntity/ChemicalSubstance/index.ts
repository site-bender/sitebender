import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { BioChemEntityProps } from "../index.ts"

import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"

export type ChemicalSubstanceType = "ChemicalSubstance"

export interface ChemicalSubstanceProps {
	"@type"?: ChemicalSubstanceType
	chemicalComposition?: Text
	chemicalRole?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
	potentialUse?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
}

type ChemicalSubstance = Thing & BioChemEntityProps & ChemicalSubstanceProps

export default ChemicalSubstance
