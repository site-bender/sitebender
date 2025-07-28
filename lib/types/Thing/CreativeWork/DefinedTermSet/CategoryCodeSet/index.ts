import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DefinedTermSetProps } from "../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"

import CategoryCodeSetComponent from "../../../../../../components/Thing/CreativeWork/DefinedTermSet/CategoryCodeSet/index.tsx"

export interface CategoryCodeSetProps {
	hasCategoryCode?: CategoryCode
}

type CategoryCodeSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps
	& CategoryCodeSetProps

export default CategoryCodeSet
