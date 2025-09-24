import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type Dataset from "../Dataset/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DatasetComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/Dataset/index.tsx"
import DefinedTermComponent from "../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import MeasurementMethodEnumComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.tsx"

export type DataCatalogType = "DataCatalog"

export interface DataCatalogProps {
	"@type"?: DataCatalogType
	dataset?: Dataset | ReturnType<typeof DatasetComponent>
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
}

type DataCatalog = Thing & CreativeWorkProps & DataCatalogProps

export default DataCatalog
