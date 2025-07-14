import DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import CreativeWork from "../index.ts"

export default interface DefinedTermSet extends CreativeWork {
	/** A Defined Term contained in this term set. */
	hasDefinedTerm?: DefinedTerm
}
