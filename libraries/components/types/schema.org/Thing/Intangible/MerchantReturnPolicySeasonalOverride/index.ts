import type {
	Date,
	DateTime,
	Integer,
	Number,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import type RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import type ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import type ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"

import { MerchantReturnEnumeration as MerchantReturnEnumerationComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { RefundTypeEnumeration as RefundTypeEnumerationComponent } from "../../../../../components/index.tsx"
import { ReturnFeesEnumeration as ReturnFeesEnumerationComponent } from "../../../../../components/index.tsx"
import { ReturnMethodEnumeration as ReturnMethodEnumerationComponent } from "../../../../../components/index.tsx"

export type MerchantReturnPolicySeasonalOverrideType =
	"MerchantReturnPolicySeasonalOverride"

export interface MerchantReturnPolicySeasonalOverrideProps {
	"@type"?: MerchantReturnPolicySeasonalOverrideType
	endDate?: Date | DateTime
	merchantReturnDays?: Date | DateTime | Integer
	refundType?:
		| RefundTypeEnumeration
		| ReturnType<typeof RefundTypeEnumerationComponent>
	restockingFee?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
	returnFees?:
		| ReturnFeesEnumeration
		| ReturnType<typeof ReturnFeesEnumerationComponent>
	returnMethod?:
		| ReturnMethodEnumeration
		| ReturnType<typeof ReturnMethodEnumerationComponent>
	returnPolicyCategory?:
		| MerchantReturnEnumeration
		| ReturnType<typeof MerchantReturnEnumerationComponent>
	returnShippingFeesAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	startDate?: Date | DateTime
}

type MerchantReturnPolicySeasonalOverride =
	& Thing
	& IntangibleProps
	& MerchantReturnPolicySeasonalOverrideProps

export default MerchantReturnPolicySeasonalOverride
