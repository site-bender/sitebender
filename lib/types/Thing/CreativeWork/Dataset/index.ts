import type { DateTime, Text, URL } from "../../../DataType/index.ts"
import type StatisticalVariable from "../../Intangible/ConstraintNode/StatisticalVariable/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type Property from "../../Intangible/Property/index.ts"
import type PropertyValue from "../../Intangible/StructuredValue/PropertyValue/index.ts"
import type DataCatalog from "../DataCatalog/index.ts"
import type CreativeWork from "../index.ts"
import type DataDownload from "../MediaObject/DataDownload/index.ts"

export default interface Dataset extends CreativeWork {
	/** A data catalog which contains this dataset. */
	catalog?: DataCatalog
	/** The range of temporal applicability of a dataset, e.g. for a 2011 census dataset, the year 2011 (in ISO 8601 time interval format). */
	datasetTimeInterval?: DateTime
	/** A downloadable form of this dataset, at a specific location, in a specific format. This property can be repeated if different variations are available. There is no expectation that different downloadable distributions must contain exactly equivalent information (see also [DCAT](https://www.w3.org/TR/vocab-dcat-3/#Class:Distribution) on this point). Different distributions might include or exclude different subsets of the entire dataset, for example. */
	distribution?: DataDownload
	/** A data catalog which contains this dataset (this property was previously 'catalog', preferred name is now 'includedInDataCatalog'). */
	includedDataCatalog?: DataCatalog
	/** A data catalog which contains this dataset. */
	includedInDataCatalog?: DataCatalog
	/** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
	issn?: Text
	/** A subproperty of [[measurementTechnique]] that can be used for specifying specific methods, in particular via [[MeasurementMethodEnum]]. */
	measurementMethod?: DefinedTerm | URL | MeasurementMethodEnum | Text
	/** A technique, method or technology used in an [[Observation]], [[StatisticalVariable]] or [[Dataset]] (or [[DataDownload]], [[DataCatalog]]), corresponding to the method used for measuring the corresponding variable(s) (for datasets, described using [[variableMeasured]]; for [[Observation]], a [[StatisticalVariable]]). Often but not necessarily each [[variableMeasured]] will have an explicit representation as (or mapping to) an property such as those defined in Schema.org, or other RDF vocabularies and "knowledge graphs". In that case the subproperty of [[variableMeasured]] called [[measuredProperty]] is applicable.      The [[measurementTechnique]] property helps when extra clarification is needed about how a [[measuredProperty]] was measured. This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but can often serve as a high level summary for dataset discovery.   For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence". If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".   If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]]. The value can also be from an enumeration, organized as a [[MeasurementMetholdEnumeration]]. */
	measurementTechnique?: Text | DefinedTerm | URL | MeasurementMethodEnum
	/** The variableMeasured property can indicate (repeated as necessary) the  variables that are measured in some dataset, either described as text or as pairs of identifier and description using PropertyValue, or more explicitly as a [[StatisticalVariable]]. */
	variableMeasured?: Property | StatisticalVariable | PropertyValue | Text
}
