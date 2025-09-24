import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import AnatomicalStructureComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import AnatomicalSystemComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"
import MedicalConditionComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"
import MedicalTherapyComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"

export type AnatomicalSystemType = "AnatomicalSystem"

export interface AnatomicalSystemProps {
	"@type"?: AnatomicalSystemType
	associatedPathophysiology?: Text
	comprisedOf?:
		| AnatomicalStructure
		| AnatomicalSystem
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
	relatedCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	relatedStructure?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
	relatedTherapy?: MedicalTherapy | ReturnType<typeof MedicalTherapyComponent>
}

type AnatomicalSystem = Thing & MedicalEntityProps & AnatomicalSystemProps

export default AnatomicalSystem
