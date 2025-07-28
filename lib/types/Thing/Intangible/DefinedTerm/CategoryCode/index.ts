import type { Text, URL } from "../../../../DataType/index.ts"
import type CategoryCodeSet from "../../../CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { DefinedTermProps } from "../index.ts"

import CategoryCodeSetComponent from "../../../../../components/Thing/CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"

export interface CategoryCodeProps {
	codeValue?: Text
	inCodeSet?:
		| CategoryCodeSet
		| URL
		| ReturnType<typeof CategoryCodeSetComponent>
}

type CategoryCode =
	& Thing
	& IntangibleProps
	& DefinedTermProps
	& CategoryCodeProps

export default CategoryCode
