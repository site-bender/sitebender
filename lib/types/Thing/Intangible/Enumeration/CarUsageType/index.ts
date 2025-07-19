// CarUsageType extends Enumeration but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CarUsageTypeProps {}

type CarUsageType =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& CarUsageTypeProps

export default CarUsageType
