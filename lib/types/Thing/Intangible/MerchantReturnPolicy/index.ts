import {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import Country from "../../Place/AdministrativeArea/Country/index.ts"
import MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import ReturnLabelSourceEnumeration from "../Enumeration/ReturnLabelSourceEnumeration/index.ts"
import ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"
import Intangible from "../index.ts"
import MemberProgramTier from "../MemberProgramTier/index.ts"
import MerchantReturnPolicySeasonalOverride from "../MerchantReturnPolicySeasonalOverride/index.ts"
import MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import PropertyValue from "../StructuredValue/PropertyValue/index.ts"

export default interface MerchantReturnPolicy extends Intangible {
	/** A property-value pair representing an additional characteristic of the entity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism. */
	additionalProperty?: PropertyValue
	/** A country where a particular merchant return policy applies to, for example the two-letter ISO 3166-1 alpha-2 country code. */
	applicableCountry?: Text | Country
	/** The type of return fees if the product is returned due to customer remorse. */
	customerRemorseReturnFees?: ReturnFeesEnumeration
	/** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned due to customer remorse. */
	customerRemorseReturnLabelSource?: ReturnLabelSourceEnumeration
	/** The amount of shipping costs if a product is returned due to customer remorse. Applicable when property [[customerRemorseReturnFees]] equals [[ReturnShippingFees]]. */
	customerRemorseReturnShippingFeesAmount?: MonetaryAmount
	/** Are in-store returns offered? (For more advanced return methods use the [[returnMethod]] property.) */
	inStoreReturnsOffered?: Boolean
	/** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
	itemCondition?: OfferItemCondition
	/** The type of return fees for returns of defect products. */
	itemDefectReturnFees?: ReturnFeesEnumeration
	/** The method (from an enumeration) by which the customer obtains a return shipping label for a defect product. */
	itemDefectReturnLabelSource?: ReturnLabelSourceEnumeration
	/** Amount of shipping costs for defect product returns. Applicable when property [[itemDefectReturnFees]] equals [[ReturnShippingFees]]. */
	itemDefectReturnShippingFeesAmount?: MonetaryAmount
	/** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the [[returnPolicyCategory]] property is specified as [[MerchantReturnFiniteReturnWindow]]. */
	merchantReturnDays?: Date | Integer | DateTime
	/** Specifies a Web page or service by URL, for product returns. */
	merchantReturnLink?: URL
	/** A refund type, from an enumerated list. */
	refundType?: RefundTypeEnumeration
	/** Use [[MonetaryAmount]] to specify a fixed restocking fee for product returns, or use [[Number]] to specify a percentage of the product price paid by the customer. */
	restockingFee?: Number | MonetaryAmount
	/** The type of return fees for purchased products (for any return reason). */
	returnFees?: ReturnFeesEnumeration
	/** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned for any reason. */
	returnLabelSource?: ReturnLabelSourceEnumeration
	/** The type of return method offered, specified from an enumeration. */
	returnMethod?: ReturnMethodEnumeration
	/** Specifies an applicable return policy (from an enumeration). */
	returnPolicyCategory?: MerchantReturnEnumeration
	/** The country where the product has to be sent to for returns, for example "Ireland" using the [[name]] property of [[Country]]. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). Note that this can be different from the country where the product was originally shipped from or sent to. */
	returnPolicyCountry?: Text | Country
	/** Seasonal override of a return policy. */
	returnPolicySeasonalOverride?: MerchantReturnPolicySeasonalOverride
	/** Amount of shipping costs for product returns (for any reason). Applicable when property [[returnFees]] equals [[ReturnShippingFees]]. */
	returnShippingFeesAmount?: MonetaryAmount
	/** The membership program tier an Offer (or a PriceSpecification, OfferShippingDetails, or MerchantReturnPolicy under an Offer) is valid for. */
	validForMemberTier?: MemberProgramTier
}
