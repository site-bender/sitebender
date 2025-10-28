import type Thing from "../../index.ts"
import type DigitalDocumentPermission from "../../Intangible/DigitalDocumentPermission/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { NoteDigitalDocumentType } from "./NoteDigitalDocument/index.ts"
import type { PresentationDigitalDocumentType } from "./PresentationDigitalDocument/index.ts"
import type { SpreadsheetDigitalDocumentType } from "./SpreadsheetDigitalDocument/index.ts"
import type { TextDigitalDocumentType } from "./TextDigitalDocument/index.ts"

import DigitalDocumentPermissionComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DigitalDocumentPermission/index.tsx"

export type DigitalDocumentType =
	| "DigitalDocument"
	| NoteDigitalDocumentType
	| SpreadsheetDigitalDocumentType
	| TextDigitalDocumentType
	| PresentationDigitalDocumentType

export interface DigitalDocumentProps {
	"@type"?: DigitalDocumentType
	hasDigitalDocumentPermission?:
		| DigitalDocumentPermission
		| ReturnType<typeof DigitalDocumentPermissionComponent>
}

type DigitalDocument = Thing & CreativeWorkProps & DigitalDocumentProps

export default DigitalDocument
