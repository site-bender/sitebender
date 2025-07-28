import type { DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type StatisticalVariable from "../ConstraintNode/StatisticalVariable/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type MeasurementMethodEnum from "../Enumeration/MeasurementMethodEnum/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"
import type { StructuredValueProps } from "../StructuredValue/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type { QuantitativeValueProps } from "../StructuredValue/QuantitativeValue/index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"
import StatisticalVariableComponent from "../../../../components/Thing/Intangible/ConstraintNode/StatisticalVariable/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import EnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/index.ts"
import MeasurementMethodEnumComponent from "../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import PropertyComponent from "../../../../components/Thing/Intangible/Property/index.ts"
import PropertyValueComponent from "../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface ObservationProps {
	marginOfError?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	measuredProperty?: Property | ReturnType<typeof PropertyComponent>
	measurementDenominator?:
		| StatisticalVariable
		| ReturnType<typeof StatisticalVariableComponent>
	measurementMethod?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	measurementQualifier?: Enumeration | ReturnType<typeof EnumerationComponent>
	measurementTechnique?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	observationAbout?:
		| Place
		| Thing
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof ThingComponent>
	observationDate?: DateTime
	observationPeriod?: Text
	variableMeasured?:
		| Property
		| PropertyValue
		| StatisticalVariable
		| Text
		| ReturnType<typeof PropertyComponent>
		| ReturnType<typeof PropertyValueComponent>
		| ReturnType<typeof StatisticalVariableComponent>
}

type Observation =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueProps
	& ObservationProps

export default Observation
