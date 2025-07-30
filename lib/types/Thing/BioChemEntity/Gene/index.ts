import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type AnatomicalStructure from "../../MedicalEntity/AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../MedicalEntity/AnatomicalSystem/index.ts"
import type BioChemEntity from "../index.ts"
import type { BioChemEntityProps } from "../index.ts"

import GeneComponent from "../../../../components/Thing/BioChemEntity/Gene/index.ts"
import BioChemEntityComponent from "../../../../components/Thing/BioChemEntity/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import AnatomicalStructureComponent from "../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import AnatomicalSystemComponent from "../../../../components/Thing/MedicalEntity/AnatomicalSystem/index.ts"

export interface GeneProps {
	"@type"?: "Gene"
	alternativeOf?: Gene | ReturnType<typeof GeneComponent>
	encodesBioChemEntity?:
		| BioChemEntity
		| ReturnType<typeof BioChemEntityComponent>
	expressedIn?:
		| AnatomicalStructure
		| AnatomicalSystem
		| BioChemEntity
		| DefinedTerm
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
		| ReturnType<typeof BioChemEntityComponent>
		| ReturnType<typeof DefinedTermComponent>
	hasBioPolymerSequence?: Text
}

type Gene = Thing & BioChemEntityProps & GeneProps

export default Gene
