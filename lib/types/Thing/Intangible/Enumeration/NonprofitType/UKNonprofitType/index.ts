// UKNonprofitType extends NonprofitType but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface UKNonprofitTypeProps {}

type UKNonprofitType =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& NonprofitTypeProps
	& UKNonprofitTypeProps

export default UKNonprofitType
