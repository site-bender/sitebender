import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import IncentiveQualifiedExpenseTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/IncentiveQualifiedExpenseType/index.tsx"

export interface IncentiveQualifiedExpenseTypeProps {
}

type IncentiveQualifiedExpenseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveQualifiedExpenseTypeProps

export default IncentiveQualifiedExpenseType
