import type { Text } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export default interface AnatomicalStructure extends MedicalEntity {
	/** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
	associatedPathophysiology?: Text
	/** Location in the body of the anatomical structure. */
	bodyLocation?: Text
	/** Other anatomical structures to which this structure is connected. */
	connectedTo?: AnatomicalStructure
	/** An image containing a diagram that illustrates the structure and/or its component substructures and/or connections with other structures. */
	diagram?: ImageObject
	/** The anatomical or organ system that this structure is part of. */
	partOfSystem?: AnatomicalSystem
	/** A medical condition associated with this anatomy. */
	relatedCondition?: MedicalCondition
	/** A medical therapy related to this anatomy. */
	relatedTherapy?: MedicalTherapy
	/** Component (sub-)structure(s) that comprise this anatomical structure. */
	subStructure?: AnatomicalStructure
}
