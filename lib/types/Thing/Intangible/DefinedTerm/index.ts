import type { Text, URL } from "../../../DataType/index.ts"
import type DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"
import type Intangible from "../index.ts"

export default interface DefinedTerm extends Intangible {
	/** A [[DefinedTermSet]] that contains this term. */
	inDefinedTermSet?: DefinedTermSet | URL
	/** A code that identifies this [[DefinedTerm]] within a [[DefinedTermSet]]. */
	termCode?: Text
}
