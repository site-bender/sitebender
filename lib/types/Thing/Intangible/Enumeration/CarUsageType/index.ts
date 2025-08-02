import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type CarUsageTypeType = "CarUsageType"

export interface CarUsageTypeProps {
	"@type"?: CarUsageTypeType
}

type CarUsageType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& CarUsageTypeProps

export default CarUsageType
