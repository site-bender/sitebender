import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type Dataset from "../Dataset/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DatasetComponent from "../../../../components/Thing/CreativeWork/Dataset/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import MeasurementMethodEnumComponent from "../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"

export interface DataCatalogProps {
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
