import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export interface TextObjectProps {
	"@type"?: "TextObject"}

type TextObject = Thing & CreativeWorkProps & MediaObjectProps & TextObjectProps

export default TextObject
