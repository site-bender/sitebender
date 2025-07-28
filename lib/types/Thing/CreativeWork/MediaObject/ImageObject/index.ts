import type { Boolean, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type PropertyValue from "../../../Intangible/StructuredValue/PropertyValue/index.ts"

import ImageObjectComponent from "../../../../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"

export interface ImageObjectProps {
	caption?: MediaObject | Text
	embeddedTextCaption?: Text
	exifData?: PropertyValue | Text
	representativeOfPage?: Boolean
}

type ImageObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ImageObjectProps

export default ImageObject
