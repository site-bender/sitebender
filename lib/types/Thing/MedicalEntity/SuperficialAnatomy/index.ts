import { Text } from "../../../DataType/index.ts"
import AnatomicalStructure from "../AnatomicalStructure/index.ts"
import AnatomicalSystem from "../AnatomicalSystem/index.ts"
import MedicalEntity from "../index.ts"
import MedicalCondition from "../MedicalCondition/index.ts"
import MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export default interface SuperficialAnatomy extends MedicalEntity {
	/** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
	associatedPathophysiology?: Text
	/** Anatomical systems or structures that relate to the superficial anatomy. */
	relatedAnatomy?: AnatomicalStructure | AnatomicalSystem
	/** A medical condition associated with this anatomy. */
	relatedCondition?: MedicalCondition
	/** A medical therapy related to this anatomy. */
	relatedTherapy?: MedicalTherapy
	/** The significance associated with the superficial anatomy; as an example, how characteristics of the superficial anatomy can suggest underlying medical conditions or courses of treatment. */
	significance?: Text
}
