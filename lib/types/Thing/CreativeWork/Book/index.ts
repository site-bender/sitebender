import type { Boolean, Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BookFormatType from "../../Intangible/Enumeration/BookFormatType/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import BookFormatTypeComponent from "../../../../components/Thing/Intangible/Enumeration/BookFormatType/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface BookProps {
	abridged?: Boolean
	bookEdition?: Text
	bookFormat?: BookFormatType | ReturnType<typeof BookFormatTypeComponent>
	illustrator?: Person | ReturnType<typeof PersonComponent>
	isbn?: Text
	numberOfPages?: Integer
}

type Book = Thing & CreativeWorkProps & BookProps

export default Book
