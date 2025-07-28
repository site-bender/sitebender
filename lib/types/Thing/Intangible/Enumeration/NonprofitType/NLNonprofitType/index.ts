import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

import NLNonprofitTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/NonprofitType/NLNonprofitType/index.tsx"

export interface NLNonprofitTypeProps {
}

type NLNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& NLNonprofitTypeProps

export default NLNonprofitType
