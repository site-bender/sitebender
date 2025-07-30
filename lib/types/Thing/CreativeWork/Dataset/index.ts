import type { DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type StatisticalVariable from "../../Intangible/ConstraintNode/StatisticalVariable/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type Property from "../../Intangible/Property/index.ts"
import type PropertyValue from "../../Intangible/StructuredValue/PropertyValue/index.ts"
import type DataCatalog from "../DataCatalog/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type DataDownload from "../MediaObject/DataDownload/index.ts"

import DataCatalogComponent from "../../../../components/Thing/CreativeWork/DataCatalog/index.ts"
import DataDownloadComponent from "../../../../components/Thing/CreativeWork/MediaObject/DataDownload/index.ts"
import StatisticalVariableComponent from "../../../../components/Thing/Intangible/ConstraintNode/StatisticalVariable/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import MeasurementMethodEnumComponent from "../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import PropertyComponent from "../../../../components/Thing/Intangible/Property/index.ts"
import PropertyValueComponent from "../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"

export interface DatasetProps {
	"@type"?: "Dataset"
	catalog?: DataCatalog | ReturnType<typeof DataCatalogComponent>
	datasetTimeInterval?: DateTime
	distribution?: DataDownload | ReturnType<typeof DataDownloadComponent>
	includedDataCatalog?: DataCatalog | ReturnType<typeof DataCatalogComponent>
	includedInDataCatalog?: DataCatalog | ReturnType<typeof DataCatalogComponent>
	issn?: Text
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
	variableMeasured?:
		| Property
		| PropertyValue
		| StatisticalVariable
		| Text
		| ReturnType<typeof PropertyComponent>
		| ReturnType<typeof PropertyValueComponent>
		| ReturnType<typeof StatisticalVariableComponent>
	variablesMeasured?:
		| PropertyValue
		| Text
		| ReturnType<typeof PropertyValueComponent>
}

type Dataset = Thing & CreativeWorkProps & DatasetProps

export default Dataset
