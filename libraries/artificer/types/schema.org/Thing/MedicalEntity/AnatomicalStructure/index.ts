import type { Text } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Thing from "../../index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type { BoneType } from "./Bone/index.ts"
import type { BrainStructureType } from "./BrainStructure/index.ts"
import type { JointType } from "./Joint/index.ts"
import type { LigamentType } from "./Ligament/index.ts"
import type { MuscleType } from "./Muscle/index.ts"
import type { NerveType } from "./Nerve/index.ts"
import type { VesselType } from "./Vessel/index.ts"

import ImageObjectComponent from "../../../../../../architect/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import AnatomicalStructureComponent from "../../../../../../architect/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import AnatomicalSystemComponent from "../../../../../../architect/src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"
import MedicalConditionComponent from "../../../../../../architect/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"
import MedicalTherapyComponent from "../../../../../../architect/src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"

export type AnatomicalStructureType =
	| "AnatomicalStructure"
	| NerveType
	| BoneType
	| BrainStructureType
	| JointType
	| VesselType
	| LigamentType
	| MuscleType

export interface AnatomicalStructureProps {
	"@type"?: AnatomicalStructureType
	associatedPathophysiology?: Text
	bodyLocation?: Text
	connectedTo?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
	diagram?: ImageObject | ReturnType<typeof ImageObjectComponent>
	partOfSystem?:
		| AnatomicalSystem
		| ReturnType<typeof AnatomicalSystemComponent>
	relatedCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	relatedTherapy?: MedicalTherapy | ReturnType<typeof MedicalTherapyComponent>
	subStructure?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
}

type AnatomicalStructure = Thing & MedicalEntityProps & AnatomicalStructureProps

export default AnatomicalStructure
