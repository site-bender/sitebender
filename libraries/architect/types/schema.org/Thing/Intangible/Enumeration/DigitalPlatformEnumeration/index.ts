import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type DigitalPlatformEnumerationType = "DigitalPlatformEnumeration"

export interface DigitalPlatformEnumerationProps {
	"@type"?: DigitalPlatformEnumerationType
}

type DigitalPlatformEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DigitalPlatformEnumerationProps

export default DigitalPlatformEnumeration
