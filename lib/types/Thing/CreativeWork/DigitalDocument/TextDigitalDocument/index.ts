// TextDigitalDocument extends DigitalDocument but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface TextDigitalDocumentProps {}

type TextDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& TextDigitalDocumentProps

export default TextDigitalDocument
