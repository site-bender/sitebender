import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"

import TextObjectComponent from "../../../../../../components/Thing/CreativeWork/MediaObject/TextObject/index.tsx"

export interface TextObjectProps {
}

type TextObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& TextObjectProps

export default TextObject
