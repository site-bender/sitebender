// PresentationDigitalDocument extends DigitalDocument but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PresentationDigitalDocumentProps {}

type PresentationDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& PresentationDigitalDocumentProps

export default PresentationDigitalDocument
