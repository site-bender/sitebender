import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { BodyMeasurementTypeEnumerationType } from "./BodyMeasurementTypeEnumeration/index.ts"
import type { WearableMeasurementTypeEnumerationType } from "./WearableMeasurementTypeEnumeration/index.ts"

export type MeasurementTypeEnumerationType =
	| "MeasurementTypeEnumeration"
	| WearableMeasurementTypeEnumerationType
	| BodyMeasurementTypeEnumerationType

export interface MeasurementTypeEnumerationProps {
	"@type"?: MeasurementTypeEnumerationType
}

type MeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps

export default MeasurementTypeEnumeration
