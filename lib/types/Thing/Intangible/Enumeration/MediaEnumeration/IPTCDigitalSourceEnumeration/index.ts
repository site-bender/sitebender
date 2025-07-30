import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MediaEnumerationProps } from "../index.ts"

export interface IPTCDigitalSourceEnumerationProps {
	"@type"?: "IPTCDigitalSourceEnumeration"}

type IPTCDigitalSourceEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaEnumerationProps
	& IPTCDigitalSourceEnumerationProps

export default IPTCDigitalSourceEnumeration
