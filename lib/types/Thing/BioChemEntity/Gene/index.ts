import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { BioChemEntityProps } from "../index.ts"
import type AnatomicalStructure from "../../MedicalEntity/AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../MedicalEntity/AnatomicalSystem/index.ts"
import type BioChemEntity from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

import GeneComponent from "../../../../../components/Thing/BioChemEntity/Gene/index.tsx"

export interface GeneProps {
	alternativeOf?: Gene
	encodesBioChemEntity?: BioChemEntity
	expressedIn?:
		| AnatomicalStructure
		| AnatomicalSystem
		| BioChemEntity
		| DefinedTerm
	hasBioPolymerSequence?: Text
}

type Gene =
	& Thing
	& BioChemEntityProps
	& GeneProps

export default Gene
