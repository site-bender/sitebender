import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface SizeSystemEnumerationProps {
	"@type"?: "SizeSystemEnumeration"}

type SizeSystemEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeSystemEnumerationProps

export default SizeSystemEnumeration
