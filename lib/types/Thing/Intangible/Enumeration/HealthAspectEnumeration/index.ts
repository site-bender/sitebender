import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface HealthAspectEnumerationProps {
	"@type"?: "HealthAspectEnumeration"}

type HealthAspectEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& HealthAspectEnumerationProps

export default HealthAspectEnumeration
