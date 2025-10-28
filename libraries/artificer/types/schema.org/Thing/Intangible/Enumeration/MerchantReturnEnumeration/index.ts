import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MerchantReturnEnumerationType = "MerchantReturnEnumeration"

export interface MerchantReturnEnumerationProps {
	"@type"?: MerchantReturnEnumerationType
}

type MerchantReturnEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MerchantReturnEnumerationProps

export default MerchantReturnEnumeration
