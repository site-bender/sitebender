import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type StructuredValue from "../index.ts"

import PropertyValueComponent from "../../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"

export interface PropertyValueProps {
	maxValue?: Number
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
	minValue?: Number
	propertyID?: Text | URL
	unitCode?: Text | URL
	unitText?: Text
	value?: Boolean | Number | StructuredValue | Text
	valueReference?:
		| DefinedTerm
		| Enumeration
		| MeasurementTypeEnumeration
		| PropertyValue
		| QualitativeValue
		| QuantitativeValue
		| StructuredValue
		| Text
}

type PropertyValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PropertyValueProps

export default PropertyValue
