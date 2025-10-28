import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MeasurementMethodEnumType = "MeasurementMethodEnum"

export interface MeasurementMethodEnumProps {
	"@type"?: MeasurementMethodEnumType
}

type MeasurementMethodEnum =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementMethodEnumProps

export default MeasurementMethodEnum
