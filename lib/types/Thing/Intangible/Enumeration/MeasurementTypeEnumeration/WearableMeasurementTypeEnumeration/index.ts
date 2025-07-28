import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MeasurementTypeEnumerationProps } from "../index.ts"

import WearableMeasurementTypeEnumerationComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/WearableMeasurementTypeEnumeration/index.tsx"

export interface WearableMeasurementTypeEnumerationProps {
}

type WearableMeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps
	& WearableMeasurementTypeEnumerationProps

export default WearableMeasurementTypeEnumeration
