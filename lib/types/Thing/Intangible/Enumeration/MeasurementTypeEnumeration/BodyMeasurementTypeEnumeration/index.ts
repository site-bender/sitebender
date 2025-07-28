import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MeasurementTypeEnumerationProps } from "../index.ts"

import BodyMeasurementTypeEnumerationComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/BodyMeasurementTypeEnumeration/index.tsx"

export interface BodyMeasurementTypeEnumerationProps {
}

type BodyMeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps
	& BodyMeasurementTypeEnumerationProps

export default BodyMeasurementTypeEnumeration
