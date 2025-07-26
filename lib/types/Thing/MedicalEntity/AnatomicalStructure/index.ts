import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface AnatomicalStructureProps {
	associatedPathophysiology?: Text
	bodyLocation?: Text
	connectedTo?: AnatomicalStructure
	diagram?: ImageObject
	partOfSystem?: AnatomicalSystem
	relatedCondition?: MedicalCondition
	relatedTherapy?: MedicalTherapy
	subStructure?: AnatomicalStructure
}

type AnatomicalStructure =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps

export default AnatomicalStructure
