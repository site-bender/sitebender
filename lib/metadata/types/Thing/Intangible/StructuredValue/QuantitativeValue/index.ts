import type { Boolean, Number, Text } from "../../../../DataType/index.ts"
import type {
	MeasurementTypeEnumeration,
	PropertyValue,
	QualitativeValue,
	URL,
} from "../../../index.ts"
import type { DefinedTerm } from "../../DefinedTerm/index.ts"
import type { Enumeration } from "../../Enumeration/index.ts"
import type { StructuredValue } from "../index.ts"

// QuantitativeValue interface - extends StructuredValue
// A point value or interval for product characteristics and other purposes.
export interface QuantitativeValue extends StructuredValue {
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
