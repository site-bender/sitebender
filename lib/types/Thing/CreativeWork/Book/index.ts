import type { Boolean, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type BookFormatType from "../../Intangible/Enumeration/BookFormatType/index.ts"
import type Person from "../../Person/index.ts"

import BookComponent from "../../../../../components/Thing/CreativeWork/Book/index.tsx"

export interface BookProps {
	abridged?: Boolean
	bookEdition?: Text
	bookFormat?: BookFormatType
	illustrator?: Person
	isbn?: Text
	numberOfPages?: Integer
}

type Book =
	& Thing
	& CreativeWorkProps
	& BookProps

export default Book
