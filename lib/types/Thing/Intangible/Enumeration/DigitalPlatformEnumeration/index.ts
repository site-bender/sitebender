import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface DigitalPlatformEnumerationProps {
	"@type"?: "DigitalPlatformEnumeration"}

type DigitalPlatformEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DigitalPlatformEnumerationProps

export default DigitalPlatformEnumeration
