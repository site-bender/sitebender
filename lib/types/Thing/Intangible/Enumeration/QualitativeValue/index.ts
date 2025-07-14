import { Text } from "../../../../DataType/index.ts"
import DefinedTerm from "../../DefinedTerm/index.ts"
import StructuredValue from "../../StructuredValue/index.ts"
import PropertyValue from "../../StructuredValue/PropertyValue/index.ts"
import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Enumeration from "../index.ts"
import MeasurementTypeEnumeration from "../MeasurementTypeEnumeration/index.ts"

export default interface QualitativeValue extends Enumeration {
	/** A property-value pair representing an additional characteristic of the entity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism. */
	additionalProperty?: PropertyValue
	/** This ordering relation for qualitative values indicates that the subject is equal to the object. */
	equal?: QualitativeValue
	/** This ordering relation for qualitative values indicates that the subject is greater than the object. */
	greater?: QualitativeValue
	/** This ordering relation for qualitative values indicates that the subject is greater than or equal to the object. */
	greaterOrEqual?: QualitativeValue
	/** This ordering relation for qualitative values indicates that the subject is lesser than the object. */
	lesser?: QualitativeValue
	/** This ordering relation for qualitative values indicates that the subject is lesser than or equal to the object. */
	lesserOrEqual?: QualitativeValue
	/** This ordering relation for qualitative values indicates that the subject is not equal to the object. */
	nonEqual?: QualitativeValue
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
