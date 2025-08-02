import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { NLNonprofitTypeType } from "./NLNonprofitType/index.ts"
import type { UKNonprofitTypeType } from "./UKNonprofitType/index.ts"
import type { USNonprofitTypeType } from "./USNonprofitType/index.ts"

export type NonprofitTypeType =
	| "NonprofitType"
	| UKNonprofitTypeType
	| USNonprofitTypeType
	| NLNonprofitTypeType

export interface NonprofitTypeProps {
	"@type"?: NonprofitTypeType
}

type NonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps

export default NonprofitType
