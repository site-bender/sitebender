import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import AnatomicalStructureComponent from "../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import AnatomicalSystemComponent from "../../../../components/Thing/MedicalEntity/AnatomicalSystem/index.ts"
import MedicalConditionComponent from "../../../../components/Thing/MedicalEntity/MedicalCondition/index.ts"
import MedicalTherapyComponent from "../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export type SuperficialAnatomyType = "SuperficialAnatomy"

export interface SuperficialAnatomyProps {
	"@type"?: SuperficialAnatomyType
	associatedPathophysiology?: Text
	relatedAnatomy?:
		| AnatomicalStructure
		| AnatomicalSystem
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
	relatedCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	relatedTherapy?: MedicalTherapy | ReturnType<typeof MedicalTherapyComponent>
	significance?: Text
}

type SuperficialAnatomy = Thing & MedicalEntityProps & SuperficialAnatomyProps

export default SuperficialAnatomy
