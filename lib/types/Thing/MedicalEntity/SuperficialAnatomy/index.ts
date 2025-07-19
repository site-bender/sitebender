import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface SuperficialAnatomyProps {
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

type SuperficialAnatomy =
	& Thing
	& MedicalEntityProps
	& SuperficialAnatomyProps

export default SuperficialAnatomy
