import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MeasurementTypeEnumerationProps {}

type MeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps

export default MeasurementTypeEnumeration
