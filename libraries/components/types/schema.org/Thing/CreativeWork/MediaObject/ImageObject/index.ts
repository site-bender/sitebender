import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type PropertyValue from "../../../Intangible/StructuredValue/PropertyValue/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { BarcodeType } from "./Barcode/index.ts"
import type { ImageObjectSnapshotType } from "./ImageObjectSnapshot/index.ts"

import { MediaObject as MediaObjectComponent } from "../../../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../../../components/index.tsx"

export type ImageObjectType =
	| "ImageObject"
	| ImageObjectSnapshotType
	| BarcodeType

export interface ImageObjectProps {
	"@type"?: ImageObjectType
	caption?: MediaObject | Text | ReturnType<typeof MediaObjectComponent>
	embeddedTextCaption?: Text
	exifData?: PropertyValue | Text | ReturnType<typeof PropertyValueComponent>
	representativeOfPage?: Boolean
}

type ImageObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ImageObjectProps

export default ImageObject
