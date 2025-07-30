import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface StatusEnumerationProps {
	"@type"?: "StatusEnumeration"}

type StatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps

export default StatusEnumeration
