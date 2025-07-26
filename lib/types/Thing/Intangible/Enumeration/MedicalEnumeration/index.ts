import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MedicalEnumerationProps {
}

type MedicalEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps

export default MedicalEnumeration
