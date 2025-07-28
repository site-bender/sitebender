import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type MedicalCondition from "../MedicalEntity/MedicalCondition/index.ts"
import type Taxon from "../Taxon/index.ts"
import type Gene from "./Gene/index.ts"

import GeneComponent from "../../../components/Thing/BioChemEntity/Gene/index.ts"
import BioChemEntityComponent from "../../../components/Thing/BioChemEntity/index.ts"
import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import GrantComponent from "../../../components/Thing/Intangible/Grant/index.ts"
import PropertyValueComponent from "../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import MedicalConditionComponent from "../../../components/Thing/MedicalEntity/MedicalCondition/index.ts"
import TaxonComponent from "../../../components/Thing/Taxon/index.ts"

export interface BioChemEntityProps {
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
