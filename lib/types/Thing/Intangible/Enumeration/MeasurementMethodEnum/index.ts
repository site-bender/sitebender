import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MeasurementMethodEnumComponent from "../../../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.tsx"

export interface MeasurementMethodEnumProps {
}

type MeasurementMethodEnum =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MeasurementMethodEnumProps

export default MeasurementMethodEnum
