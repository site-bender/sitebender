import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Dataset from "../Dataset/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"

import DataCatalogComponent from "../../../../../components/Thing/CreativeWork/DataCatalog/index.tsx"

export interface DataCatalogProps {
	dataset?: Dataset
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
}

type DataCatalog =
	& Thing
	& CreativeWorkProps
	& DataCatalogProps

export default DataCatalog
