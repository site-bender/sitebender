import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MeasurementTypeEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.tsx"

export interface MeasurementTypeEnumerationProps {
}

type MeasurementTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementTypeEnumerationProps

export default MeasurementTypeEnumeration
