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

import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { Enumeration as EnumerationComponent } from "../../../../../components/index.tsx"
import { MeasurementMethodEnum as MeasurementMethodEnumComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { Property as PropertyComponent } from "../../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { StatisticalVariable as StatisticalVariableComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"

export type ObservationType = "Observation"

export interface ObservationProps {
	"@type"?: ObservationType
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
