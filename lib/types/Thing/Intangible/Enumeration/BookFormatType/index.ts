import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface BookFormatTypeProps {}

type BookFormatType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BookFormatTypeProps

export default BookFormatType
