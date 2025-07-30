import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface SizeGroupEnumerationProps {
	"@type"?: "SizeGroupEnumeration"}

type SizeGroupEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeGroupEnumerationProps

export default SizeGroupEnumeration
