import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export interface PresentationDigitalDocumentProps {
	"@type"?: "PresentationDigitalDocument"}

type PresentationDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& PresentationDigitalDocumentProps

export default PresentationDigitalDocument
