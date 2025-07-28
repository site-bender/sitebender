import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

import NoteDigitalDocumentComponent from "../../../../../../components/Thing/CreativeWork/DigitalDocument/NoteDigitalDocument/index.tsx"

export interface NoteDigitalDocumentProps {
}

type NoteDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& NoteDigitalDocumentProps

export default NoteDigitalDocument
