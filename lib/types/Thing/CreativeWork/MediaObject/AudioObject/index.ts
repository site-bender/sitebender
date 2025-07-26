import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"

export interface AudioObjectProps {
	caption?: MediaObject | Text
	embeddedTextCaption?: Text
	transcript?: Text
}

type AudioObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps

export default AudioObject
