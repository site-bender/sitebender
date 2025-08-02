import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type CertificationStatusEnumerationType =
	"CertificationStatusEnumeration"

export interface CertificationStatusEnumerationProps {
	"@type"?: CertificationStatusEnumerationType
}

type CertificationStatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& CertificationStatusEnumerationProps

export default CertificationStatusEnumeration
