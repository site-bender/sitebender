import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

import UKNonprofitTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/NonprofitType/UKNonprofitType/index.tsx"

export interface UKNonprofitTypeProps {
}

type UKNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& UKNonprofitTypeProps

export default UKNonprofitType
