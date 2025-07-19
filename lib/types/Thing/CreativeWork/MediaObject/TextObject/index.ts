// TextObject extends MediaObject but adds no additional properties
import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

// deno-lint-ignore no-empty-interface
export interface TextObjectProps {}

type TextObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& TextObjectProps

export default TextObject
