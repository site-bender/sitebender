import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { DefinedTermProps } from "../index.ts"
import type CategoryCodeSet from "../../../CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"

import CategoryCodeComponent from "../../../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"

export interface CategoryCodeProps {
	codeValue?: Text
	inCodeSet?: CategoryCodeSet | URL
}

type CategoryCode =
	& Thing
	& IntangibleProps
	& DefinedTermProps
	& CategoryCodeProps

export default CategoryCode
