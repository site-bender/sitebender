import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import NonprofitTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/NonprofitType/index.tsx"

export interface NonprofitTypeProps {
}

type NonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps

export default NonprofitType
