import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

import PresentationDigitalDocumentComponent from "../../../../../../components/Thing/CreativeWork/DigitalDocument/PresentationDigitalDocument/index.tsx"

export interface PresentationDigitalDocumentProps {
}

type PresentationDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& PresentationDigitalDocumentProps

export default PresentationDigitalDocument
