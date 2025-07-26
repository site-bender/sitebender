import type {
	Date,
	DateTime,
	Integer,
	Number,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import type ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import type ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"

export interface MerchantReturnPolicySeasonalOverrideProps {
	endDate?: Date | DateTime
	merchantReturnDays?: Date | DateTime | Integer
	refundType?: RefundTypeEnumeration
	restockingFee?: MonetaryAmount | Number
	returnFees?: ReturnFeesEnumeration
	returnMethod?: ReturnMethodEnumeration
	returnPolicyCategory?: MerchantReturnEnumeration
	returnShippingFeesAmount?: MonetaryAmount
	startDate?: Date | DateTime
}

type MerchantReturnPolicySeasonalOverride =
	& Thing
	& IntangibleProps
	& MerchantReturnPolicySeasonalOverrideProps

export default MerchantReturnPolicySeasonalOverride
