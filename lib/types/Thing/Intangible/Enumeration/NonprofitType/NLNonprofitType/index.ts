// NLNonprofitType extends NonprofitType but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface NLNonprofitTypeProps {}

type NLNonprofitType =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& NonprofitTypeProps
	& NLNonprofitTypeProps

export default NLNonprofitType
