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
import type { DataFeedType } from "./DataFeed/index.ts"

import DataCatalogComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/DataCatalog/index.tsx"
import DataDownloadComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/MediaObject/DataDownload/index.tsx"
import StatisticalVariableComponent from "../../../../../../pagewright/src/define/Thing/Intangible/ConstraintNode/StatisticalVariable/index.tsx"
import DefinedTermComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import MeasurementMethodEnumComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.tsx"
import PropertyComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Property/index.tsx"
import PropertyValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"

export type DatasetType = "Dataset" | DataFeedType

export interface DatasetProps {
	"@type"?: DatasetType
	catalog?: DataCatalog | ReturnType<typeof DataCatalogComponent>
	datasetTimeInterval?: DateTime
	distribution?: DataDownload | ReturnType<typeof DataDownloadComponent>
	includedDataCatalog?: DataCatalog | ReturnType<typeof DataCatalogComponent>
	includedInDataCatalog?:
		| DataCatalog
		| ReturnType<typeof DataCatalogComponent>
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
