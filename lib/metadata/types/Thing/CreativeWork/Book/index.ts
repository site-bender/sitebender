import type { Boolean, Integer, Text } from "../../../DataType/index.ts"
import type { BookFormatType } from "../../index.ts"
import type { Person } from "../../Person/index.ts"
import type { CreativeWork } from "../index.ts"

// Book interface - extends CreativeWork
// A book.
export interface Book extends CreativeWork {
	abridged?: Boolean
	bookEdition?: Text
	bookFormat?: BookFormatType
	illustrator?: Person
	isbn?: Text
	numberOfPages?: Integer
}
