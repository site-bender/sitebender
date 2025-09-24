import type { Boolean, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BookFormatType from "../../Intangible/Enumeration/BookFormatType/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { AudiobookType } from "./Audiobook/index.ts"

import BookFormatTypeComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/BookFormatType/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type BookType = "Book" | AudiobookType

export interface BookProps {
	"@type"?: BookType
	abridged?: Boolean
	bookEdition?: Text
	bookFormat?: BookFormatType | ReturnType<typeof BookFormatTypeComponent>
	illustrator?: Person | ReturnType<typeof PersonComponent>
	isbn?: Text
	numberOfPages?: Integer
	title?: Text
}

type Book = Thing & CreativeWorkProps & BookProps

export default Book
