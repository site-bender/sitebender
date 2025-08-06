import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type MedicalCondition from "../MedicalEntity/MedicalCondition/index.ts"
import type Taxon from "../Taxon/index.ts"
import type { ChemicalSubstanceType } from "./ChemicalSubstance/index.ts"
import type Gene from "./Gene/index.ts"
import type { GeneType } from "./Gene/index.ts"
import type { MolecularEntityType } from "./MolecularEntity/index.ts"
import type { ProteinType } from "./Protein/index.ts"

import { Gene as GeneComponent } from "../../../../components/index.tsx"
import { BioChemEntity as BioChemEntityComponent } from "../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../components/index.tsx"
import { Grant as GrantComponent } from "../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../components/index.tsx"
import { MedicalCondition as MedicalConditionComponent } from "../../../../components/index.tsx"
import { Taxon as TaxonComponent } from "../../../../components/index.tsx"

export type BioChemEntityType =
	| "BioChemEntity"
	| ProteinType
	| GeneType
	| MolecularEntityType
	| ChemicalSubstanceType

export interface BioChemEntityProps {
	"@type"?: BioChemEntityType
	associatedDisease?:
		| MedicalCondition
		| PropertyValue
		| URL
		| ReturnType<typeof MedicalConditionComponent>
		| ReturnType<typeof PropertyValueComponent>
	bioChemInteraction?: BioChemEntity | ReturnType<typeof BioChemEntityComponent>
	bioChemSimilarity?: BioChemEntity | ReturnType<typeof BioChemEntityComponent>
	biologicalRole?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	hasBioChemEntityPart?:
		| BioChemEntity
		| ReturnType<typeof BioChemEntityComponent>
	hasMolecularFunction?:
		| DefinedTerm
		| PropertyValue
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof PropertyValueComponent>
	hasRepresentation?:
		| PropertyValue
		| Text
		| URL
		| ReturnType<typeof PropertyValueComponent>
	isEncodedByBioChemEntity?: Gene | ReturnType<typeof GeneComponent>
	isInvolvedInBiologicalProcess?:
		| DefinedTerm
		| PropertyValue
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof PropertyValueComponent>
	isLocatedInSubcellularLocation?:
		| DefinedTerm
		| PropertyValue
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof PropertyValueComponent>
	isPartOfBioChemEntity?:
		| BioChemEntity
		| ReturnType<typeof BioChemEntityComponent>
	taxonomicRange?:
		| DefinedTerm
		| Taxon
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof TaxonComponent>
}

type BioChemEntity = Thing & BioChemEntityProps

export default BioChemEntity
