import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type LegalForceStatusType = "LegalForceStatus"

export interface LegalForceStatusProps {
	"@type"?: LegalForceStatusType
}

type LegalForceStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& LegalForceStatusProps

export default LegalForceStatus
