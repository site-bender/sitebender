import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export interface NoteDigitalDocumentProps {
	"@type"?: "NoteDigitalDocument"}

type NoteDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& NoteDigitalDocumentProps

export default NoteDigitalDocument
