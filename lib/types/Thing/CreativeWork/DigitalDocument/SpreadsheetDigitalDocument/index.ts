// SpreadsheetDigitalDocument extends DigitalDocument but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { DigitalDocumentProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SpreadsheetDigitalDocumentProps {}

type SpreadsheetDigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps
	& SpreadsheetDigitalDocumentProps

export default SpreadsheetDigitalDocument
