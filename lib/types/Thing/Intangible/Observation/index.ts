import type { DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { StructuredValueProps } from "../StructuredValue/index.ts"
import type { QuantitativeValueProps } from "../StructuredValue/QuantitativeValue/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type MeasurementMethodEnum from "../Enumeration/MeasurementMethodEnum/index.ts"
import type Place from "../../Place/index.ts"
import type Property from "../Property/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type StatisticalVariable from "../ConstraintNode/StatisticalVariable/index.ts"

import ObservationComponent from "../../../../../components/Thing/Intangible/Observation/index.tsx"

export interface ObservationProps {
	marginOfError?: QuantitativeValue
	measuredProperty?: Property
	measurementDenominator?: StatisticalVariable
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementQualifier?: Enumeration
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
	observationAbout?: Place | Thing
	observationDate?: DateTime
	observationPeriod?: Text
	variableMeasured?: Property | PropertyValue | StatisticalVariable | Text
}

type Observation =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueProps
	& ObservationProps

export default Observation
