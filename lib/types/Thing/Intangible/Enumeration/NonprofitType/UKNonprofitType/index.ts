import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { NonprofitTypeProps } from "../index.ts"

export type UKNonprofitTypeType = "UKNonprofitType"

export interface UKNonprofitTypeProps {
	"@type"?: UKNonprofitTypeType
}

type UKNonprofitType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& NonprofitTypeProps
	& UKNonprofitTypeProps

export default UKNonprofitType
