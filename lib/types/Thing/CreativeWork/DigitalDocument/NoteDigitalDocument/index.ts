import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export type NoteDigitalDocumentType = "NoteDigitalDocument"

export interface NoteDigitalDocumentProps {
	"@type"?: NoteDigitalDocumentType
}

type NoteDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& NoteDigitalDocumentProps

export default NoteDigitalDocument
