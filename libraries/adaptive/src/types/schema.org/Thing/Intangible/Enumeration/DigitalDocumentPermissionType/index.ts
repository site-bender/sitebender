import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type DigitalDocumentPermissionTypeType = "DigitalDocumentPermissionType"

export interface DigitalDocumentPermissionTypeProps {
	"@type"?: DigitalDocumentPermissionTypeType
}

type DigitalDocumentPermissionType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DigitalDocumentPermissionTypeProps

export default DigitalDocumentPermissionType
