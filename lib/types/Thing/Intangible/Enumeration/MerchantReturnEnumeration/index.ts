import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MerchantReturnEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/MerchantReturnEnumeration/index.tsx"

export interface MerchantReturnEnumerationProps {
}

type MerchantReturnEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MerchantReturnEnumerationProps

export default MerchantReturnEnumeration
