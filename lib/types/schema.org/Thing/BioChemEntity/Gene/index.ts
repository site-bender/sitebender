import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type AnatomicalStructure from "../../MedicalEntity/AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../MedicalEntity/AnatomicalSystem/index.ts"
import type BioChemEntity from "../index.ts"
import type { BioChemEntityProps } from "../index.ts"

import { Gene as GeneComponent } from "../../../../../components/index.tsx"
import { BioChemEntity as BioChemEntityComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { AnatomicalStructure as AnatomicalStructureComponent } from "../../../../../components/index.tsx"
import { AnatomicalSystem as AnatomicalSystemComponent } from "../../../../../components/index.tsx"

export type GeneType = "Gene"

export interface GeneProps {
	"@type"?: GeneType
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
