import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface DigitalDocumentPermissionTypeProps {
}

type DigitalDocumentPermissionType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DigitalDocumentPermissionTypeProps

export default DigitalDocumentPermissionType
