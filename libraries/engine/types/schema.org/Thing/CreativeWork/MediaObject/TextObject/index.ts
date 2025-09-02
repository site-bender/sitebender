import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export type TextObjectType = "TextObject"

export interface TextObjectProps {
	"@type"?: TextObjectType
}

type TextObject = Thing & CreativeWorkProps & MediaObjectProps & TextObjectProps

export default TextObject
