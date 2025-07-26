import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface SuperficialAnatomyProps {
	associatedPathophysiology?: Text
	relatedAnatomy?: AnatomicalStructure | AnatomicalSystem
	relatedCondition?: MedicalCondition
	relatedTherapy?: MedicalTherapy
	significance?: Text
}

type SuperficialAnatomy =
	& Thing
	& MedicalEntityProps
	& SuperficialAnatomyProps

export default SuperficialAnatomy
