import { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import DefinedTerm from "../../DefinedTerm/index.ts"
import Enumeration from "../../Enumeration/index.ts"
import MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import StructuredValue from "../index.ts"
import QuantitativeValue from "../QuantitativeValue/index.ts"

export default interface PropertyValue extends StructuredValue {
	/** The upper value of some characteristic or property. */
	maxValue?: Number
	/** A subproperty of [[measurementTechnique]] that can be used for specifying specific methods, in particular via [[MeasurementMethodEnum]]. */
	measurementMethod?: DefinedTerm | URL | MeasurementMethodEnum | Text
	/** A technique, method or technology used in an [[Observation]], [[StatisticalVariable]] or [[Dataset]] (or [[DataDownload]], [[DataCatalog]]), corresponding to the method used for measuring the corresponding variable(s) (for datasets, described using [[variableMeasured]]; for [[Observation]], a [[StatisticalVariable]]). Often but not necessarily each [[variableMeasured]] will have an explicit representation as (or mapping to) an property such as those defined in Schema.org, or other RDF vocabularies and "knowledge graphs". In that case the subproperty of [[variableMeasured]] called [[measuredProperty]] is applicable.      The [[measurementTechnique]] property helps when extra clarification is needed about how a [[measuredProperty]] was measured. This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but can often serve as a high level summary for dataset discovery.   For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence". If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".   If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]]. The value can also be from an enumeration, organized as a [[MeasurementMetholdEnumeration]]. */
	measurementTechnique?: Text | DefinedTerm | URL | MeasurementMethodEnum
	/** The lower value of some characteristic or property. */
	minValue?: Number
	/** A commonly used identifier for the characteristic represented by the property, e.g. a manufacturer or a standard code for a property. propertyID can be (1) a prefixed string, mainly meant to be used with standards for product properties; (2) a site-specific, non-prefixed string (e.g. the primary key of the property or the vendor-specific ID of the property), or (3) a URL indicating the type of the property, either pointing to an external vocabulary, or a Web resource that describes the property (e.g. a glossary entry). Standards bodies should promote a standard prefix for the identifiers of properties from their standards. */
	propertyID?: Text | URL
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
