import type Audience from "../../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type AllocateAction from "../index.ts"

export default interface AuthorizeAction extends AllocateAction {
	/** A sub property of participant. The participant who is at the receiving end of the action. */
	recipient?: Organization | Audience | ContactPoint | Person
}
