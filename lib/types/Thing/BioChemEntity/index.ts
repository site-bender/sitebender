import { Text, URL } from "../../DataType/index.ts"
import Thing from "../index.ts"
import DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import Grant from "../Intangible/Grant/index.ts"
import PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import MedicalCondition from "../MedicalEntity/MedicalCondition/index.ts"
import Taxon from "../Taxon/index.ts"
import Gene from "./Gene/index.ts"

export default interface BioChemEntity extends Thing {
	/** Disease associated to this BioChemEntity. Such disease can be a MedicalCondition or a URL. If you want to add an evidence supporting the association, please use PropertyValue. */
	associatedDisease?: URL | PropertyValue | MedicalCondition
	/** A BioChemEntity that is known to interact with this item. */
	bioChemInteraction?: BioChemEntity
	/** A similar BioChemEntity, e.g., obtained by fingerprint similarity algorithms. */
	bioChemSimilarity?: BioChemEntity
	/** A role played by the BioChemEntity within a biological context. */
	biologicalRole?: DefinedTerm
	/** A [[Grant]] that directly or indirectly provide funding or sponsorship for this item. See also [[ownershipFundingInfo]]. */
	funding?: Grant
	/** Indicates a BioChemEntity that (in some sense) has this BioChemEntity as a part. */
	hasBioChemEntityPart?: BioChemEntity
	/** Molecular function performed by this BioChemEntity; please use PropertyValue if you want to include any evidence. */
	hasMolecularFunction?: DefinedTerm | URL | PropertyValue
	/** A common representation such as a protein sequence or chemical structure for this entity. For images use schema.org/image. */
	hasRepresentation?: PropertyValue | Text | URL
	/** Another BioChemEntity encoding by this one. */
	isEncodedByBioChemEntity?: Gene
	/** Biological process this BioChemEntity is involved in; please use PropertyValue if you want to include any evidence. */
	isInvolvedInBiologicalProcess?: PropertyValue | DefinedTerm | URL
	/** Subcellular location where this BioChemEntity is located; please use PropertyValue if you want to include any evidence. */
	isLocatedInSubcellularLocation?: PropertyValue | URL | DefinedTerm
	/** Indicates a BioChemEntity that is (in some sense) a part of this BioChemEntity. */
	isPartOfBioChemEntity?: BioChemEntity
	/** The taxonomic grouping of the organism that expresses, encodes, or in some way related to the BioChemEntity. */
	taxonomicRange?: Taxon | Text | URL | DefinedTerm
}
