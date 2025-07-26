import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DefinedTermSetProps } from "../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"

export interface CategoryCodeSetProps {
	hasCategoryCode?: CategoryCode
}

type CategoryCodeSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps
	& CategoryCodeSetProps

export default CategoryCodeSet
