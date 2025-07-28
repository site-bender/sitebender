import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import type MerchantReturnPolicySeasonalOverride from "../MerchantReturnPolicySeasonalOverride/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"
import type RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import type ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import type ReturnLabelSourceEnumeration from "../Enumeration/ReturnLabelSourceEnumeration/index.ts"
import type ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"

import MerchantReturnPolicyComponent from "../../../../../components/Thing/Intangible/MerchantReturnPolicy/index.tsx"

export interface MerchantReturnPolicyProps {
	additionalProperty?: PropertyValue
	applicableCountry?: Country | Text
	customerRemorseReturnFees?: ReturnFeesEnumeration
	customerRemorseReturnLabelSource?: ReturnLabelSourceEnumeration
	customerRemorseReturnShippingFeesAmount?: MonetaryAmount
	inStoreReturnsOffered?: Boolean
	itemCondition?: OfferItemCondition
	itemDefectReturnFees?: ReturnFeesEnumeration
	itemDefectReturnLabelSource?: ReturnLabelSourceEnumeration
	itemDefectReturnShippingFeesAmount?: MonetaryAmount
	merchantReturnDays?: Date | DateTime | Integer
	merchantReturnLink?: URL
	refundType?: RefundTypeEnumeration
	restockingFee?: MonetaryAmount | Number
	returnFees?: ReturnFeesEnumeration
	returnLabelSource?: ReturnLabelSourceEnumeration
	returnMethod?: ReturnMethodEnumeration
	returnPolicyCategory?: MerchantReturnEnumeration
	returnPolicyCountry?: Country | Text
	returnPolicySeasonalOverride?: MerchantReturnPolicySeasonalOverride
	returnShippingFeesAmount?: MonetaryAmount
	validForMemberTier?: MemberProgramTier
}

type MerchantReturnPolicy =
	& Thing
	& IntangibleProps
	& MerchantReturnPolicyProps

export default MerchantReturnPolicy
