import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type AnatomicalStructure from "../../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import type { LifestyleModificationProps } from "../index.ts"

export interface PhysicalActivityProps {
	/** The anatomy of the underlying organ system or structures associated with this entity. */
	associatedAnatomy?:
		| AnatomicalStructure
		| SuperficialAnatomy
		| AnatomicalSystem
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
	/** The characteristics of associated patients, such as age, gender, race etc. */
	epidemiology?: Text
	/** Changes in the normal mechanical, physical, and biochemical functions that are associated with this activity or condition. */
	pathophysiology?: Text
}

type PhysicalActivity =
	& Thing
	& LifestyleModificationProps
	& MedicalEntityProps
	& PhysicalActivityProps

export default PhysicalActivity
