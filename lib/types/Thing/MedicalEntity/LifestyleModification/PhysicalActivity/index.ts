import { Text, URL } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import AnatomicalStructure from "../../AnatomicalStructure/index.ts"
import AnatomicalSystem from "../../AnatomicalSystem/index.ts"
import SuperficialAnatomy from "../../SuperficialAnatomy/index.ts"
import LifestyleModification from "../index.ts"

export default interface PhysicalActivity extends LifestyleModification {
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
