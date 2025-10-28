import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export type PresentationDigitalDocumentType = "PresentationDigitalDocument"

export interface PresentationDigitalDocumentProps {
	"@type"?: PresentationDigitalDocumentType
}

type PresentationDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& PresentationDigitalDocumentProps

export default PresentationDigitalDocument
