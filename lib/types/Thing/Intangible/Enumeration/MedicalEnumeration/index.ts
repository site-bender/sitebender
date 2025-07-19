// MedicalEnumeration extends Enumeration but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalEnumerationProps {}

type MedicalEnumeration =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& MedicalEnumerationProps

export default MedicalEnumeration
