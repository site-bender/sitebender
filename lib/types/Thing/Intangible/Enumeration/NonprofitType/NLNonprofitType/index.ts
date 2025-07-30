import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

export interface NLNonprofitTypeProps {
	"@type"?: "NLNonprofitType"}

type NLNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& NLNonprofitTypeProps

export default NLNonprofitType
