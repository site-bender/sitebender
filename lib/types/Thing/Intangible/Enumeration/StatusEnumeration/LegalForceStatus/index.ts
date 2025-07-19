// LegalForceStatus extends StatusEnumeration but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface LegalForceStatusProps {}

type LegalForceStatus =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& StatusEnumerationProps
	& LegalForceStatusProps

export default LegalForceStatus
