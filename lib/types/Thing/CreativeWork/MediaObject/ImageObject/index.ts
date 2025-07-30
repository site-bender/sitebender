import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type PropertyValue from "../../../Intangible/StructuredValue/PropertyValue/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

import PropertyValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import MediaObjectComponent from "../../../../../components/Thing/MediaObject/index.ts"

export interface ImageObjectProps {
	"@type"?: "ImageObject"
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
