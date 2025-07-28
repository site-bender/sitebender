import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

export interface USNonprofitTypeProps {}

type USNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& USNonprofitTypeProps

export default USNonprofitType
