import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DefinedTermSetProps } from "../index.ts"

export interface CategoryCodeSetProps {
	/** A Category code contained in this code set. */
	hasCategoryCode?: CategoryCode
}

type CategoryCodeSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps
	& CategoryCodeSetProps

export default CategoryCodeSet
