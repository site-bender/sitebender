import { Text, URL } from "../../../../DataType/index.ts"
import CategoryCodeSet from "../../../CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"
import DefinedTerm from "../index.ts"

export default interface CategoryCode extends DefinedTerm {
	/** A short textual code that uniquely identifies the value. */
	codeValue?: Text
	/** A [[CategoryCodeSet]] that contains this category code. */
	inCodeSet?: URL | CategoryCodeSet
}
