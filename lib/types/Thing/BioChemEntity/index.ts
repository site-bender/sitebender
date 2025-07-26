import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Gene from "./Gene/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type MedicalCondition from "../MedicalEntity/MedicalCondition/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type Taxon from "../Taxon/index.ts"

export interface BioChemEntityProps {
	associatedDisease?: MedicalCondition | PropertyValue | URL
	bioChemInteraction?: BioChemEntity
	bioChemSimilarity?: BioChemEntity
	biologicalRole?: DefinedTerm
	funding?: Grant
	hasBioChemEntityPart?: BioChemEntity
	hasMolecularFunction?: DefinedTerm | PropertyValue | URL
	hasRepresentation?: PropertyValue | Text | URL
	isEncodedByBioChemEntity?: Gene
	isInvolvedInBiologicalProcess?: DefinedTerm | PropertyValue | URL
	isLocatedInSubcellularLocation?: DefinedTerm | PropertyValue | URL
	isPartOfBioChemEntity?: BioChemEntity
	taxonomicRange?: DefinedTerm | Taxon | Text | URL
}

type BioChemEntity =
	& Thing
	& BioChemEntityProps

export default BioChemEntity
