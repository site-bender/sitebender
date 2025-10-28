import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { IPTCDigitalSourceEnumerationType } from "./IPTCDigitalSourceEnumeration/index.ts"

export type MediaEnumerationType =
	| "MediaEnumeration"
	| IPTCDigitalSourceEnumerationType

export interface MediaEnumerationProps {
	"@type"?: MediaEnumerationType
}

type MediaEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaEnumerationProps

export default MediaEnumeration
