import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

export type USNonprofitTypeType = "USNonprofitType"

export interface USNonprofitTypeProps {
	"@type"?: USNonprofitTypeType
}

type USNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& USNonprofitTypeProps

export default USNonprofitType
