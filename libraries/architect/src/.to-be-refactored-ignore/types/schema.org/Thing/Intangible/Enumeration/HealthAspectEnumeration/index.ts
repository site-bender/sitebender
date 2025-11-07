import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type HealthAspectEnumerationType = "HealthAspectEnumeration"

export interface HealthAspectEnumerationProps {
	"@type"?: HealthAspectEnumerationType
}

type HealthAspectEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& HealthAspectEnumerationProps

export default HealthAspectEnumeration
