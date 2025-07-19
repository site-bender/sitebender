import type { Boolean, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BookFormatType from "../../Intangible/Enumeration/BookFormatType/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface BookProps {
	/** Indicates whether the book is an abridged edition. */
	abridged?: Boolean
	/** The edition of the book. */
	bookEdition?: Text
	/** The format of the book. */
	bookFormat?: BookFormatType
	/** The illustrator of the book. */
	illustrator?: Person
	/** The ISBN of the book. */
	isbn?: Text
	/** The number of pages in the book. */
	numberOfPages?: Integer
}

type Book =
	& Thing
	& CreativeWorkProps
	& BookProps

export default Book
