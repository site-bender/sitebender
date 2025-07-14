import { Date, DateTime, Integer, Number } from "../../../DataType/index.ts"
import MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"
import Intangible from "../index.ts"
import MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"

export default interface MerchantReturnPolicySeasonalOverride
	extends Intangible {
	/** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	endDate?: Date | DateTime
	/** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the [[returnPolicyCategory]] property is specified as [[MerchantReturnFiniteReturnWindow]]. */
	merchantReturnDays?: Date | Integer | DateTime
	/** A refund type, from an enumerated list. */
	refundType?: RefundTypeEnumeration
	/** Use [[MonetaryAmount]] to specify a fixed restocking fee for product returns, or use [[Number]] to specify a percentage of the product price paid by the customer. */
	restockingFee?: Number | MonetaryAmount
	/** The type of return fees for purchased products (for any return reason). */
	returnFees?: ReturnFeesEnumeration
	/** The type of return method offered, specified from an enumeration. */
	returnMethod?: ReturnMethodEnumeration
	/** Specifies an applicable return policy (from an enumeration). */
	returnPolicyCategory?: MerchantReturnEnumeration
	/** Amount of shipping costs for product returns (for any reason). Applicable when property [[returnFees]] equals [[ReturnShippingFees]]. */
	returnShippingFeesAmount?: MonetaryAmount
	/** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	startDate?: Date | DateTime
}
