import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { EventProps } from "../index.ts"

export interface EducationEventProps {
	/** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
	assesses?: Text | DefinedTerm
	/** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
	educationalLevel?: URL | Text | DefinedTerm
	/** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
	teaches?: Text | DefinedTerm
}

type EducationEvent =
	& Thing
	& EventProps
	& EducationEventProps

export default EducationEvent
