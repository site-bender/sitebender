// MeasurementTypeEnumeration extends Enumeration but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MeasurementTypeEnumerationProps {}

type MeasurementTypeEnumeration =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& MeasurementTypeEnumerationProps

export default MeasurementTypeEnumeration
