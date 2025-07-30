import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface CertificationStatusEnumerationProps {
	"@type"?: "CertificationStatusEnumeration"}

type CertificationStatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& CertificationStatusEnumerationProps

export default CertificationStatusEnumeration
