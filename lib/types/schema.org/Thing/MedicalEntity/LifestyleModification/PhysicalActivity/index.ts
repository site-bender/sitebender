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

import { AnatomicalStructure as AnatomicalStructureComponent } from "../../../../../../components/index.tsx"
import { AnatomicalSystem as AnatomicalSystemComponent } from "../../../../../../components/index.tsx"
import { CategoryCode as CategoryCodeComponent } from "../../../../../../components/index.tsx"
import { PhysicalActivityCategory as PhysicalActivityCategoryComponent } from "../../../../../../components/index.tsx"
import { SuperficialAnatomy as SuperficialAnatomyComponent } from "../../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../../components/index.tsx"

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
