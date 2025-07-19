import type { Text, URL } from "../../../../DataType/index.ts"
import type CategoryCodeSet from "../../../CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { DefinedTermProps } from "../index.ts"

export interface CategoryCodeProps {
	/** A short textual code that uniquely identifies the value. */
	codeValue?: Text
	/** A [[CategoryCodeSet]] that contains this category code. */
	inCodeSet?: URL | CategoryCodeSet
}

type CategoryCode =
	& Thing
	& DefinedTermProps
	& IntangibleProps
	& CategoryCodeProps

export default CategoryCode
