import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import type PropertyValue from "../PropertyValue/index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type StructuredValue from "../index.ts"

export interface QuantitativeValueProps {
	additionalProperty?: PropertyValue
	maxValue?: Number
	minValue?: Number
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

type QuantitativeValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueProps

export default QuantitativeValue
