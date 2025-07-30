import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface IncentiveQualifiedExpenseTypeProps {
	"@type"?: "IncentiveQualifiedExpenseType"}

type IncentiveQualifiedExpenseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveQualifiedExpenseTypeProps

export default IncentiveQualifiedExpenseType
