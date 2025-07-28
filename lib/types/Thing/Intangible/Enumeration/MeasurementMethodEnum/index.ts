import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MeasurementMethodEnumProps {}

type MeasurementMethodEnum =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementMethodEnumProps

export default MeasurementMethodEnum
