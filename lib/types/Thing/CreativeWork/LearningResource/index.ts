import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface LearningResourceProps {
	/** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
	assesses?: Text | DefinedTerm
	/** Knowledge, skill, ability or personal attribute that must be demonstrated by a person or other entity in order to do something such as earn an Educational Occupational Credential or understand a LearningResource. */
	competencyRequired?: URL | Text | DefinedTerm
	/** An alignment to an established educational framework.  This property should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource [[teaches]] or [[assesses]] a competency. */
	educationalAlignment?: AlignmentObject
	/** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
	educationalLevel?: URL | Text | DefinedTerm
	/** The purpose of a work in the context of education; for example, 'assignment', 'group work'. */
	educationalUse?: Text | DefinedTerm
	/** The predominant type or kind characterizing the learning resource. For example, 'presentation', 'handout'. */
	learningResourceType?: Text | DefinedTerm
	/** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
	teaches?: Text | DefinedTerm
}

type LearningResource =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps

export default LearningResource
