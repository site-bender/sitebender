import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

export interface SpreadsheetDigitalDocumentProps {}

type SpreadsheetDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& SpreadsheetDigitalDocumentProps

export default SpreadsheetDigitalDocument
