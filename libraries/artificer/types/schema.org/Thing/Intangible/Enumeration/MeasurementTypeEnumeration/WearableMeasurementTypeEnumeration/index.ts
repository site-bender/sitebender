import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MeasurementTypeEnumerationProps } from "../index.ts"

export type WearableMeasurementTypeEnumerationType =
	"WearableMeasurementTypeEnumeration"

export interface WearableMeasurementTypeEnumerationProps {
	"@type"?: WearableMeasurementTypeEnumerationType
}

type WearableMeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps
	& WearableMeasurementTypeEnumerationProps

export default WearableMeasurementTypeEnumeration
