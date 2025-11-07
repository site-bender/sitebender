import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type AnatomicalStructure from "../../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import type { LifestyleModificationProps } from "../index.ts"
import type { ExercisePlanType } from "./ExercisePlan/index.ts"

import ThingComponent from "../../../../../../src/define/Thing/index.tsx"
import CategoryCodeComponent from "../../../../../../src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import PhysicalActivityCategoryComponent from "../../../../../../src/define/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"
import AnatomicalStructureComponent from "../../../../../../src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import AnatomicalSystemComponent from "../../../../../../src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"
import SuperficialAnatomyComponent from "../../../../../../src/define/Thing/MedicalEntity/SuperficialAnatomy/index.tsx"

export type PhysicalActivityType = "PhysicalActivity" | ExercisePlanType

export interface PhysicalActivityProps {
	"@type"?: PhysicalActivityType
	associatedAnatomy?:
		| AnatomicalStructure
		| AnatomicalSystem
		| SuperficialAnatomy
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
		| ReturnType<typeof SuperficialAnatomyComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	epidemiology?: Text
	pathophysiology?: Text
}

type PhysicalActivity =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps
	& PhysicalActivityProps

export default PhysicalActivity
