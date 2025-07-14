import { Text, URL } from "../../../DataType/index.ts"
import DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"
import Intangible from "../index.ts"

export default interface DefinedTerm extends Intangible {
	/** A [[DefinedTermSet]] that contains this term. */
	inDefinedTermSet?: DefinedTermSet | URL
	/** A code that identifies this [[DefinedTerm]] within a [[DefinedTermSet]]. */
	termCode?: Text
}
