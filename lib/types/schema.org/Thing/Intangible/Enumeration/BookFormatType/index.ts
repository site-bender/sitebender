import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type BookFormatTypeType = "BookFormatType"

export interface BookFormatTypeProps {
	"@type"?: BookFormatTypeType
}

type BookFormatType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BookFormatTypeProps

export default BookFormatType
