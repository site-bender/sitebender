import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export interface TextDigitalDocumentProps {}

type TextDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& TextDigitalDocumentProps

export default TextDigitalDocument
