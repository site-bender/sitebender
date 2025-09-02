import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DefinedTerm from "../../../Intangible/DefinedTerm/index.ts"
import type MeasurementMethodEnum from "../../../Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

import { DefinedTerm as DefinedTermComponent } from "../../../../../../components/index.tsx"
import { MeasurementMethodEnum as MeasurementMethodEnumComponent } from "../../../../../../components/index.tsx"

export type DataDownloadType = "DataDownload"

export interface DataDownloadProps {
	"@type"?: DataDownloadType
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

type DataDownload =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& DataDownloadProps

export default DataDownload
