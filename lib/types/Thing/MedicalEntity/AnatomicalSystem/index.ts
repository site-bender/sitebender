import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface AnatomicalSystemProps {
	associatedPathophysiology?: Text
	comprisedOf?: AnatomicalStructure | AnatomicalSystem
	relatedCondition?: MedicalCondition
	relatedStructure?: AnatomicalStructure
	relatedTherapy?: MedicalTherapy
}

type AnatomicalSystem =
	& Thing
	& MedicalEntityProps
	& AnatomicalSystemProps

export default AnatomicalSystem
