import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type IncentiveQualifiedExpenseTypeType = "IncentiveQualifiedExpenseType"

export interface IncentiveQualifiedExpenseTypeProps {
	"@type"?: IncentiveQualifiedExpenseTypeType
}

type IncentiveQualifiedExpenseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveQualifiedExpenseTypeProps

export default IncentiveQualifiedExpenseType
