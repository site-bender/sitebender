import type { Number } from "../../../../../DataType/index.ts"
import type PeopleAudience from "../index.ts"

export default interface ParentAudience extends PeopleAudience {
	/** Maximal age of the child. */
	childMaxAge?: Number
	/** Minimal age of the child. */
	childMinAge?: Number
}
