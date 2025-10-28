import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import AnatomicalStructureComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import AnatomicalSystemComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"
import MedicalConditionComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"
import MedicalTherapyComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"

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
