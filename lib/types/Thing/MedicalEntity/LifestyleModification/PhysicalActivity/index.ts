import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { LifestyleModificationProps } from "../index.ts"
import type AnatomicalStructure from "../../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../AnatomicalSystem/index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"

export interface PhysicalActivityProps {
	associatedAnatomy?:
		| AnatomicalStructure
		| AnatomicalSystem
		| SuperficialAnatomy
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	epidemiology?: Text
	pathophysiology?: Text
}

type PhysicalActivity =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps
	& PhysicalActivityProps

export default PhysicalActivity
