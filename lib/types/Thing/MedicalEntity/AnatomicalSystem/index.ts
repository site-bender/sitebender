import { Text } from "../../../DataType/index.ts"
import AnatomicalStructure from "../AnatomicalStructure/index.ts"
import MedicalEntity from "../index.ts"
import MedicalCondition from "../MedicalCondition/index.ts"
import MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export default interface AnatomicalSystem extends MedicalEntity {
	/** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
	associatedPathophysiology?: Text
	/** Specifying something physically contained by something else. Typically used here for the underlying anatomical structures, such as organs, that comprise the anatomical system. */
	comprisedOf?: AnatomicalStructure | AnatomicalSystem
	/** A medical condition associated with this anatomy. */
	relatedCondition?: MedicalCondition
	/** Related anatomical structure(s) that are not part of the system but relate or connect to it, such as vascular bundles associated with an organ system. */
	relatedStructure?: AnatomicalStructure
	/** A medical therapy related to this anatomy. */
	relatedTherapy?: MedicalTherapy
}
