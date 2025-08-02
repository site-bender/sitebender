import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export type TextDigitalDocumentType = "TextDigitalDocument"

export interface TextDigitalDocumentProps {
	"@type"?: TextDigitalDocumentType
}

type TextDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& TextDigitalDocumentProps

export default TextDigitalDocument
