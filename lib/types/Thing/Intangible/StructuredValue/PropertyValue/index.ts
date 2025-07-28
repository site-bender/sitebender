import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import DefinedTermComponent from "../../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import EnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/index.ts"
import MeasurementMethodEnumComponent from "../../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import MeasurementTypeEnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.ts"
import QualitativeValueComponent from "../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import StructuredValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/index.ts"
import PropertyValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface PropertyValueProps {
	maxValue?: Number
	measurementMethod?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	measurementTechnique?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	minValue?: Number
	propertyID?: Text | URL
	unitCode?: Text | URL
	unitText?: Text
	value?:
		| Boolean
		| Number
		| StructuredValue
		| Text
		| ReturnType<typeof StructuredValueComponent>
	valueReference?:
		| DefinedTerm
		| Enumeration
		| MeasurementTypeEnumeration
		| PropertyValue
		| QualitativeValue
		| QuantitativeValue
		| StructuredValue
		| Text
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof MeasurementTypeEnumerationComponent>
		| ReturnType<typeof PropertyValueComponent>
		| ReturnType<typeof QualitativeValueComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof StructuredValueComponent>
}

type PropertyValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PropertyValueProps

export default PropertyValue
