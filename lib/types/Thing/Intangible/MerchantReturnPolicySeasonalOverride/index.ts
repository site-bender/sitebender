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

import MerchantReturnEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/MerchantReturnEnumeration/index.ts"
import RefundTypeEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/RefundTypeEnumeration/index.ts"
import ReturnFeesEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/ReturnFeesEnumeration/index.ts"
import ReturnMethodEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/ReturnMethodEnumeration/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"

export interface MerchantReturnPolicySeasonalOverrideProps {
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
