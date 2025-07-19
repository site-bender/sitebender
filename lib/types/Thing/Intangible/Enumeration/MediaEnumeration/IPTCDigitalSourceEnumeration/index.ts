// IPTCDigitalSourceEnumeration extends MediaEnumeration but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MediaEnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface IPTCDigitalSourceEnumerationProps {}

type IPTCDigitalSourceEnumeration =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& MediaEnumerationProps
	& IPTCDigitalSourceEnumerationProps

export default IPTCDigitalSourceEnumeration
