import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export interface LegalForceStatusProps {
	"@type"?: "LegalForceStatus"}

type LegalForceStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& LegalForceStatusProps

export default LegalForceStatus
