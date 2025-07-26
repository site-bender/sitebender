import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface CarUsageTypeProps {
}

type CarUsageType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& CarUsageTypeProps

export default CarUsageType
