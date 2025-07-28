import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

import SpreadsheetDigitalDocumentComponent from "../../../../../../components/Thing/CreativeWork/DigitalDocument/SpreadsheetDigitalDocument/index.tsx"

export interface SpreadsheetDigitalDocumentProps {
}

type SpreadsheetDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& SpreadsheetDigitalDocumentProps

export default SpreadsheetDigitalDocument
