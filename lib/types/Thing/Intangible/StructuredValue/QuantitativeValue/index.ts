import { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import DefinedTerm from "../../DefinedTerm/index.ts"
import Enumeration from "../../Enumeration/index.ts"
import MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import StructuredValue from "../index.ts"
import PropertyValue from "../PropertyValue/index.ts"

export default interface QuantitativeValue extends StructuredValue {
	/** A property-value pair representing an additional characteristic of the entity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism. */
	additionalProperty?: PropertyValue
	/** The upper value of some characteristic or property. */
	maxValue?: Number
	/** The lower value of some characteristic or property. */
	minValue?: Number
	/** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
	unitCode?: Text | URL
	/** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for <a href='unitCode'>unitCode</a>. */
	unitText?: Text
	/** The value of a [[QuantitativeValue]] (including [[Observation]]) or property value node.\n\n* For [[QuantitativeValue]] and [[MonetaryAmount]], the recommended type for values is 'Number'.\n* For [[PropertyValue]], it can be 'Text', 'Number', 'Boolean', or 'StructuredValue'.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
	value?: Text | Number | Boolean | StructuredValue
	/** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
	valueReference?:
		| QualitativeValue
		| Text
		| DefinedTerm
		| MeasurementTypeEnumeration
		| Enumeration
		| PropertyValue
		| StructuredValue
		| QuantitativeValue
}
