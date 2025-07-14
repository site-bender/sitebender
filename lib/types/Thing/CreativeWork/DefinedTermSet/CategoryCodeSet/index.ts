import CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import DefinedTermSet from "../index.ts"

export default interface CategoryCodeSet extends DefinedTermSet {
	/** A Category code contained in this code set. */
	hasCategoryCode?: CategoryCode
}
