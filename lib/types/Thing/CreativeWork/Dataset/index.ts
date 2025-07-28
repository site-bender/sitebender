import type { DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type DataCatalog from "../DataCatalog/index.ts"
import type DataDownload from "../MediaObject/DataDownload/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type Property from "../../Intangible/Property/index.ts"
import type PropertyValue from "../../Intangible/StructuredValue/PropertyValue/index.ts"
import type StatisticalVariable from "../../Intangible/ConstraintNode/StatisticalVariable/index.ts"

import DatasetComponent from "../../../../../components/Thing/CreativeWork/Dataset/index.tsx"

export interface DatasetProps {
	catalog?: DataCatalog
	datasetTimeInterval?: DateTime
	distribution?: DataDownload
	includedDataCatalog?: DataCatalog
	includedInDataCatalog?: DataCatalog
	issn?: Text
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
	variableMeasured?: Property | PropertyValue | StatisticalVariable | Text
	variablesMeasured?: PropertyValue | Text
}

type Dataset =
	& Thing
	& CreativeWorkProps
	& DatasetProps

export default Dataset
