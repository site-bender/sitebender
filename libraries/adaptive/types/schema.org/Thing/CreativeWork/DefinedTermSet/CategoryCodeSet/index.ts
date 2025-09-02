import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DefinedTermSetProps } from "../index.ts"

import { CategoryCode as CategoryCodeComponent } from "../../../../../../components/index.tsx"

export type CategoryCodeSetType = "CategoryCodeSet"

export interface CategoryCodeSetProps {
	"@type"?: CategoryCodeSetType
	hasCategoryCode?: CategoryCode | ReturnType<typeof CategoryCodeComponent>
}

type CategoryCodeSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps
	& CategoryCodeSetProps

export default CategoryCodeSet
