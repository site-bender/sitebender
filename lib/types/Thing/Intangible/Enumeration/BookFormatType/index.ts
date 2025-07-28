import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import BookFormatTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/BookFormatType/index.tsx"

export interface BookFormatTypeProps {
}

type BookFormatType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BookFormatTypeProps

export default BookFormatType
