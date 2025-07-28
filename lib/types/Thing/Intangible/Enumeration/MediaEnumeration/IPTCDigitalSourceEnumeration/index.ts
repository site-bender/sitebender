import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MediaEnumerationProps } from "../index.ts"

import IPTCDigitalSourceEnumerationComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.tsx"

export interface IPTCDigitalSourceEnumerationProps {
}

type IPTCDigitalSourceEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaEnumerationProps
	& IPTCDigitalSourceEnumerationProps

export default IPTCDigitalSourceEnumeration
