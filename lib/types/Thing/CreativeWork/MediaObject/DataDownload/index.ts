import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type DefinedTerm from "../../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"

export interface DataDownloadProps {
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
}

type DataDownload =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& DataDownloadProps

export default DataDownload
