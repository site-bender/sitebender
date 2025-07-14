import { Text, URL } from "../../../DataType/index.ts"
import DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import Event from "../index.ts"

export default interface EducationEvent extends Event {
	/** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
	assesses?: Text | DefinedTerm
	/** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
	educationalLevel?: URL | Text | DefinedTerm
	/** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
	teaches?: Text | DefinedTerm
}
