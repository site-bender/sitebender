import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MerchantReturnEnumerationProps {
	"@type"?: "MerchantReturnEnumeration"}

type MerchantReturnEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MerchantReturnEnumerationProps

export default MerchantReturnEnumeration
